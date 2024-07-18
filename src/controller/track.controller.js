const asyncHandler = require("express-async-handler");
const trackModel = require("../models/track.model");
const selectionModel = require("../models/selection.model");

const getAllTracks = asyncHandler(async (req, res) => {
  const tracks = await trackModel.find();

  return res.status(200).json({
    success: true,
    // Send the latest created data first.
    data: tracks.reverse(),
  });
});

const getTrack = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const track = await trackModel.findOne({ _id: Number(id) });

  return res.status(200).json({
    success: true,
    data: track,
  });
});

const addTrackToFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const track = await trackModel.findOne({ _id: Number(id) });

  if (!track) {
    return res.status(404).json({
      success: true,
      data: "Трек с таким номером не был найден.",
    });
  }

  await trackModel.updateOne(
    { _id: Number(id) },
    { $push: { staredUser: req.userId } }
  );

  return res.status(200).json({
    success: true,
    data: "Трек был добавлен в избранное.",
  });
});

const deleteTrackFromFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const track = await trackModel.findOne({ _id: Number(id) });

  if (!track) {
    return res.status(404).json({
      success: true,
      data: "Трек с таким номером не был найден.",
    });
  }

  await trackModel.updateOne(
    { _id: Number(id) },
    { $pull: { staredUser: req.userId } }
  );

  return res.status(200).json({
    success: true,
    data: "Трек был удален из избранного.",
  });
});

const getAllFavorite = asyncHandler(async (req, res) => {
  const tracks = await trackModel.find({ staredUser: req.userId });

  return res.status(200).json({
    success: true,
    // Send the latest created data first.
    data: tracks.reverse(),
  });
});

const addTracksToFavorite = asyncHandler(async (req, res) => {
  const { id } = req.query;

  await trackModel.updateMany(
    { _id: { $in: id } },
    { $push: { staredUser: req.userId } }
  );

  return res.status(200).json({
    success: true,
    data: "Треки были добавлены в избранное.",
  });
});

const deleteTracksFromFavorite = asyncHandler(async (req, res) => {
  const { id } = req.query;

  await trackModel.updateMany(
    { _id: { $in: id } },
    { $pull: { staredUser: req.userId } }
  );

  return res.status(200).json({
    success: true,
    data: "Треки были удалены из избранного.",
  });
});

const getAllSelection = asyncHandler(async (req, res) => {
  const selections = await selectionModel.find();

  return res.status(200).json({
    success: true,
    // Send the latest created data first.
    data: selections.reverse(),
  });
});

const getSelectionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const selection = await selectionModel.findOne({ _id: Number(id) });

  return res.status(200).json({
    success: true,
    data: selection,
  });
});

const addTrackToSelection = asyncHandler(async (req, res) => {
  const { trackId, selectionId } = req.params;
  const track = await trackModel.findOne({ _id: Number(trackId) });

  if (!track) {
    return res.status(404).json({
      success: true,
      data: "Трек с таким номером не был найден.",
    });
  }

  await selectionModel.updateOne(
    { _id: Number(selectionId) },
    { $push: { items: trackId } }
  );

  return res.status(200).json({
    success: true,
    data: "Трек был добавлен в подборку.",
  });
});

const deleteTrackFromSelection = asyncHandler(async (req, res) => {
  const { trackId, selectionId } = req.params;
  const track = await trackModel.findOne({ _id: Number(trackId) });

  if (!track) {
    return res.status(404).json({
      success: true,
      data: "Трек с таким номером не был найден.",
    });
  }

  await selectionModel.updateOne(
    { _id: Number(selectionId) },
    { $pull: { items: trackId } }
  );

  return res.status(200).json({
    success: true,
    data: "Трек был удален из подборки.",
  });
});

const createSelection = asyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    const selection = await new selectionModel({
      name: name,
      owner: req.userId,
    });

    selection.save();
    return res.status(201).json({
      success: true,
      message: "selection created sucessfully",
      data: selection,
    });
  } catch (error) {
    return res.status(412).json({
      success: false,
      message: error,
    });
  }
});

const deleteSelection = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await selectionModel.deleteOne({ _id: Number(id) });

  return res.status(200).json({
    success: true,
    data: "Selection deleted successfully",
  });
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
  deleteSelection,
  getSelectionById,
  addTrackToSelection,
  deleteTrackFromSelection,
};
