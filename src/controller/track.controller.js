const asyncHandler = require("express-async-handler");

//Importing the track model to the controller 
const trackModel = require("../models/track.model");
const selectionModel = require("../models/selection.model");

//Get all tracks async function 
const getAllTracks = asyncHandler(async (req, res) => {

    //Fetching all tracks from the database and assigning it to tracks
    const tracks = await trackModel.find();

    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: tracks.reverse()
    })
    //I use .reverse() function to get the latest datas at first  
}
);

//Get track by id async function 
const getTrack = asyncHandler(async (req, res) => {
    const { id } = req.params;
    //Fetching all tracks from the database and assigning it to tracks
    const track = await trackModel.findOne({ _id: Number(id) });
    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: track
    })
    //I use .reverse() function to get the latest datas at first  
}
);

//Get track by id async function 
const addTrackToFavorite = asyncHandler(async (req, res) => {
    const { id } = req.params;

    //Fetching all tracks from the database and assigning it to tracks
    const track = await trackModel.findOne({ _id: Number(id) });

    if (!track) {
        return res.status(404).json({
            success: true,
            data: "Трек с таким номером не был найден."
        })
    }

    await trackModel.updateOne({ _id: Number(id) }, { $push: { staredUser: req.userId } });

    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: "Трек был добавлен в избранное."
    })
}
);

//Remove track from favorite
const deleteTrackFromFavorite = asyncHandler(async (req, res) => {
    const { id } = req.params;

    //Fetching all tracks from the database and assigning it to tracks
    const track = await trackModel.findOne({ _id: Number(id) });

    if (!track) {
        return res.status(404).json({
            success: true,
            data: "Трек с таким номером не был найден."
        })
    }

    await trackModel.updateOne({ _id: Number(id) }, { $pull: { staredUser: req.userId } });

    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: "Трек был удален из избранного."
    })
}
);

//Get all tracks from favorite for user async function 
const getAllFavorite = asyncHandler(async (req, res) => {
    //Fetching all tracks from the database and assigning it to tracks
    const tracks = await trackModel.find({ staredUser: req.userId });

    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: tracks.reverse()
    })
    //I use .reverse() function to get the latest datas at first  
}
);

//Add tracks to favorite by ids async function 
const addTracksToFavorite = asyncHandler(async (req, res) => {
    const { id } = req.query;

    await trackModel.updateMany({ _id: { $in: id } }, { $push: { staredUser: req.userId } });

    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: "Треки были добавлены в избранное."
    })
}
);

//Remove tracks from favorite
const deleteTracksFromFavorite = asyncHandler(async (req, res) => {
    const { id } = req.query;

    await trackModel.updateMany({ _id: { $in: id } }, { $pull: { staredUser: req.userId } });

    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: "Треки были удалены из избранного."
    })
}
);

//Show user selections
const getAllSelection = asyncHandler(async (req, res) => {
    const selections = await selectionModel.find();

    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: selections.reverse()
    })
    //I use .reverse() function to get the latest datas at first  
})

//Get selection by id async function 
const getSelectionById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const selection = await selectionModel.findOne({ _id: Number(id) });
    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: selection
    })
    //I use .reverse() function to get the latest datas at first  
}
);

//Add track by id to selection async function 
const addTrackToSelection = asyncHandler(async (req, res) => {
    const { trackId, selectionId } = req.params;
    //Fetching all tracks from the database and assigning it to tracks
    const track = await trackModel.findOne({ _id: Number(trackId) });

    if (!track) {
        return res.status(404).json({
            success: true,
            data: "Трек с таким номером не был найден."
        })
    }

    await selectionModel.updateOne({ _id: Number(selectionId) }, { $push: { items: trackId } });

    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: "Трек был добавлен в подборку."
    })
}
);

//Remove track from selection
const deleteTrackFromSelection = asyncHandler(async (req, res) => {
    const { trackId, selectionId } = req.params;

    //Fetching all tracks from the database and assigning it to tracks
    const track = await trackModel.findOne({ _id: Number(trackId) });

    if (!track) {
        return res.status(404).json({
            success: true,
            data: "Трек с таким номером не был найден."
        })
    }

    await selectionModel.updateOne({ _id: Number(selectionId) }, { $pull: { items: trackId } });

    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: "Трек был удален из подборки."
    })
}
);

const createSelection = asyncHandler(async (req, res) => {
    //Destruct the data sent from req.body 
    const { name } = req.body;

    try {
        //creating the track
        const selection = await new selectionModel({
            name: name,
            owner: req.userId,
        })

        selection.save();
        return res.status(201).json({
            success: true,
            message: "selection created sucessfully",
            data: selection
        })


    } catch (error) {
        return res.status(412).json({
            success: false,
            message: error
        })
    }

});

module.exports = {
    getAllTracks,
    getTrack,
    addTrackToFavorite,
    deleteTrackFromFavorite,
    getAllFavorite,
    addTracksToFavorite,
    deleteTracksFromFavorite,
    getAllSelection,
    createSelection,
    getSelectionById,
    addTrackToSelection,
    deleteTrackFromSelection,
}