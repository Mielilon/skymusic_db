const express = require("express");
const router = express.Router();
const trackController = require("../controller/track.controller");
const verifyToken = require("../middleware/auth.middleware");

router.get("/track/all", trackController.getAllTracks);
router.get("/track/:id", trackController.getTrack);
router.post(
  "/track/:id/favorite",
  verifyToken,
  trackController.addTrackToFavorite
);
router.delete(
  "/track/:id/favorite",
  verifyToken,
  trackController.deleteTrackFromFavorite
);
router.get("/track/favorite/all", verifyToken, trackController.getAllFavorite);
router.post(
  "/track/favorite",
  verifyToken,
  trackController.addTracksToFavorite
);
router.delete(
  "/track/favorite",
  verifyToken,
  trackController.deleteTracksFromFavorite
);
router.post("/selection", verifyToken, trackController.createSelection);
router.get("/selection/all", trackController.getAllSelection);
router.get("/selection/:id", trackController.getSelectionById);
router.delete(
  "/selection/:selectionId/track/:trackId/delete",
  verifyToken,
  trackController.deleteTrackFromSelection
);
router.post(
  "/selection/:selectionId/track/:trackId/update",
  verifyToken,
  trackController.addTrackToSelection
);

module.exports = router;
