const mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");
const Selection = require("./selection.model");
const CounterModel = require("./counter.model");

const userSchema = mongoose.Schema({
  _id: Number,
  password: {
    type: String,
    maxLength: 128,
  },
  lastLogin: {
    type: Date,
    default: null,
    required: false,
    alias: "Дата последнего входа.",
  },
  // Designates that this user has all permissions without explicitly assigning them.
  isSuperuser: {
    type: Boolean,
    default: false,
    alias: "Суперпользователь",
  },
  username: {
    type: String,
    unique: [true, "Пользователем с данным username уже существует."],
    required: [
      true,
      "Обязательное поле. Не более 150 символов: латинские буквы, цифры или @/./+/-/_ .",
    ],
    maxLength: 150,
    validate: {
      // Regex to validate username characters
      validator: (input) => /^[a-zA-Z][a-zA-Z\-_.@+0-9]*$/g.test(input),
      message: () =>
        "Только цифры и латинские буквы (или спец символы: @/./+/-/_)",
    },
  },
  firstName: {
    type: String,
    maxLength: 150,
    required: false,
    alias: "Имя",
  },
  lastName: {
    type: String,
    maxLength: 150,
    required: false,
    alias: "Фамилия",
  },
  // Designates whether the user can log into this admin site.
  isStaff: {
    type: Boolean,
    default: false,
    alias: "Админ",
  },
  // Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
  isActive: {
    type: Boolean,
    default: true,
    alias: "Активен",
  },
  dateJoined: {
    type: Date,
    default: Date.now(),
    alias: "Дата регистрации",
  },
  email: {
    type: String,
    unique: true,
    maxLength: 254,
    alias: "Email",
    validate: {
      // Regex email format unicode
      validator: (input) =>
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          input
        ),
      message: (input) => "Ожидаемый формат email@domain.com",
    },
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  userPermissions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Permission" },
  ],
});

userSchema.post("remove", (document) => {
  const userId = document._id;
  Selection.find({ owner: userId }).then((selections) => {
    Promise.all(
      selections.map((selection) =>
        Selection.findOneAndUpdate(
          selection._id,
          { $pull: { owner: userId } },
          { new: true }
        )
      )
    );
  });
});

userSchema.plugin(passportLocalMongoose);
userSchema.pre("save", function (next) {
  var user = this;
  // Before saving, increment the count in the userCount document in the counter collection and create the doc if not already made.
  CounterModel.findByIdAndUpdate(
    "userCount",
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
    .then((res) => {
      user._id = res.seq;
      next();
    })
    .catch((error) => {
      return next(error);
    });
});

module.exports = mongoose.model("User", userSchema);
