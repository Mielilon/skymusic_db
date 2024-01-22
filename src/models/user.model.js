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
    alias: 'last login'
  },
  // Designates that this user has all permissions without explicitly assigning them.
  isSuperuser: {
    type: Boolean,
    default: false,
    alias: 'superuser status',
  },
  username: {
    type: String,
    unique: [true, 'A user with that username already exists.'],
    required: [true, 'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'],
    maxLength: 150,
    validate: {
      // Regex to validate username characters
      validator: (input) => /^[a-zA-Z][a-zA-Z\-_.@+0-9]*$/g.test(input),
      message: () => 'Expected only numbers and letters (also allowed: @/./+/-/_)',
    },
  },
  firstName: {
    type: String,
    maxLength: 150,
    required: false,
    alias: 'first name',
  },
  lastName: {
    type: String,
    maxLength: 150,
    required: false,
    alias: 'last name',
  },
  // Designates whether the user can log into this admin site.
  isStaff: {
    type: Boolean,
    default: false,
    alias: 'staff status',
  },
  // Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
  isActive: {
    type: Boolean,
    default: true,
    alias: 'active'
  },
  dateJoined: {
    type: Date,
    default: Date.now(),
    alias: 'date joined'
  },
  email: {
    type: String,
    unique: true,
    maxLength: 254,
    alias: 'email address',
    validate: {
      // Regex email format unicode
      validator: (input) => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input),
      message: (input) => 'Expected format email@domain.com',
    },
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  userPermissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
})

userSchema.post("remove", document => {
  const userId = document._id;
  Selection.find({ owner: userId }).then(selections => {
    Promise.all(
      selections.map(selection =>
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
userSchema.pre('save', function (next) {
  var user = this;
  // Before saving, increment the count in the userCount document in the counter collection and create the doc if not already made.
  CounterModel.findByIdAndUpdate('userCount',
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

module.exports = mongoose.model("User", userSchema)