const { Review, ReviewImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const express = require("express");
const router = express.Router();

// --------------------------------- //
// ------ DELETE REVIEW IMAGE ------ //
// --------------------------------- //

router.delete("/:imageId", requireAuth, async (req, res) => {
  const {
    user,
    params: { imageId },
  } = req;

  const imageData = await ReviewImage.findOne({
    where: {
      id: imageId,
    },
    include: {
      model: Review,
    },
  });

  if (!imageData) {
    return res.status(404).json({ message: "Review Image couldn't be found" });
  } else if (imageData.Review.userId !== user.id) {
    return res.status(403).json({ message: "Forbidden" });
  } else {
    await imageData.destroy();

    return res.json({ message: "Successfully deleted" });
  }
});

module.exports = router;
