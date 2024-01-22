//Importing Libraries
const mongoose = require("mongoose");
const CounterModel = require("./counter.model");

//using monoose to create the track schema
const trackSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        maxLength: 50,
        alias: 'Название',
    },
    author: {
        type: String,
        maxLength: 50,
    },
    releaseDate: {
        type: Date,
        alias: 'Дата выхода',

    },
    genre: {
        type: Array,
        maxLength: 50,
        alias: 'Жанр'
    },
    durationInSeconds: {
        type: Number,
        alias: 'Длительность в секундах'
    },
    album: {
        type: String,
        maxLength: 50,
        alias: 'Альбом',
    },
    logo: {
        type: Buffer,
        contentType: String,
        required: false,
        alias: 'Обложка',
    },
    trackFile: {
        type: Buffer,
        contentType: String,
        alias: 'Файл'
    },
    staredUser: [{ type: mongoose.Schema.Types.Number, ref: 'User' }],
});

trackSchema.pre('save', function(next) {
    var track = this;
    // Before saving, increment the count in the trackCount document in the counter collection and create the doc if not already made.
    CounterModel.findByIdAndUpdate('trackCount',
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    )
        .then((res) => {
            track._id = res.seq;
            next();
        })
        .catch((error) => {
            return next(error);
        })
  });


//exporting the track schema as monngose collection
module.exports = mongoose.model('Track', trackSchema);