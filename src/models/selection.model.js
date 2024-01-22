//Importing Libraries
const mongoose = require("mongoose");
const CounterModel = require("./counter.model");

//using monoose to create the selection schema
const selectionSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        maxLength: 50,
        alias: 'Название',
    },
    items: [{ type: mongoose.Schema.Types.Number, ref: 'Track' }],
    owner: [{ type: mongoose.Schema.Types.Number, ref: 'User' }],
});

selectionSchema.pre('save', function (next) {
    var selection = this;
    // Before saving, increment the count in the selectionCount document in the counter collection and create the doc if not already made.
    CounterModel.findByIdAndUpdate('selectionCount',
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    )
        .then((res) => {
            selection._id = res.seq;
            next();
        })
        .catch((error) => {
            return next(error);
        });
});

//exporting the selection schema as monngose collection
module.exports = mongoose.model('Selection', selectionSchema);