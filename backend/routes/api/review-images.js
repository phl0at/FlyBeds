const { Review, ReviewImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const express = require("express");
const router = express.Router();

// --------------------------------- //
// ------ DELETE REVIEW IMAGE ------ //
// --------------------------------- //

router.delete("/:imageId", requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const currUser = req.user;
  const imageData = await ReviewImage.findOne({
    where: {
      id: imageId,
    },
    include: {
      model: Review,
    },
  });

  if (!imageData)
    return res.status(404).json({ message: "Review Image couldn't be found" });

  imageData.Review.userId !== currUser.id
    ? res.status(403).json({ message: "Forbidden" })
    : await imageData.destroy();
  return res.json({ message: "Successfully deleted" });
});

module.exports = router;
