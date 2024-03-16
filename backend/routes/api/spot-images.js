const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Spot, SpotImage } = require("../../db/models");
const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const currUser = req.user.dataValues;
  const imageData = await SpotImage.findOne({
    where: {
      id: imageId,
    },
    include: {
      model: Spot,
    },
  });
  if (!imageData)
    return res.status(404).json({ message: "Spot Image couldn't be found" });

  imageData.Spot.ownerId !== currUser.id
    ? res.status(403).json({ message: "Forbidden" })
    : await imageData.destroy();

  return res.json({ message: "Successfully deleted" });
});

module.exports = router;
