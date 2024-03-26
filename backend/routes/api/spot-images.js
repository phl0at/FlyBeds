const { Spot, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const express = require("express");
const router = express.Router();

// ------------------------------- //
// ------ DELETE SPOT IMAGE ------ //
// ------------------------------- //

router.delete("/:imageId", requireAuth, async (req, res) => {
  const {
    user,
    params: { imageId },
  } = req;

  const imageData = await SpotImage.findOne({
    where: {
      id: imageId,
    },
    include: {
      model: Spot,
    },
  });

  if (!imageData) {
    return res.status(404).json({ message: "Spot Image couldn't be found" });
  } else if (imageData.Spot.ownerId !== user.id) {
    return res.status(403).json({ message: "Forbidden" });
  } else {
    await imageData.destroy();

    return res.json({ message: "Successfully deleted" });
  }
});

module.exports = router;
