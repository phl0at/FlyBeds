//! --------------------------------------------------------------------
//*                             JS HELPERS
//! --------------------------------------------------------------------

export const sortReviews = (reviews) => {
  if (reviews.length <= 1) return reviews;

  const pivot = reviews[reviews.length - 1];
  const left = [];
  const right = [];

  for (const review of reviews.slice(0, reviews.length - 1)) {
    review.createdAt > pivot.createdAt ? left.push(review) : right.push(review);
  }

  return [...sortReviews(left), pivot, ...sortReviews(right)];
};

//! --------------------------------------------------------------------

export const calculateAvg = (arr) => {
  let sum = 0;
  let numReviews = arr.length;

  for (let review of arr) {
    sum += review.stars;
  }

  let avgRating = (sum / numReviews).toFixed(1).toString();

  if (avgRating.split(".").length < 2) avgRating += ".0";

  return { avgRating, numReviews };
};

//! --------------------------------------------------------------------

export const sortImages = (arr) => {
  let hasImages = false;
  let mainImg = "";
  const otherImg = [];

  if (arr.length) {
    hasImages = true;

    arr.forEach((img) => {
      if (img.preview) {
        mainImg = img.url;
      } else {
        otherImg.push(img.url);
      }
    });
  }

  return { hasImages, mainImg, otherImg };
};

//! --------------------------------------------------------------------

export const checkReviewErrors = (review, rating) => {
  if (review.length < 10 || rating < 1) {
    return false;
  } else {
    return true;
  }
};

export const checkImageErrors = (spotImages) => {
  const err = {};

  if (spotImages[0].url) {
    if (spotImages[0].url.split(".").length) {
      const fileType = spotImages[0].url.split(".");

      if (
        fileType[fileType.length - 1] == "png" ||
        fileType[fileType.length - 1] == "jpg" ||
        fileType[fileType.length - 1] == "jpeg"
      ) {
        delete err.previewImage;
      } else {
        err.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
      }
    }
  } else {
    err.previewImage = "Preview image is required";
  }

  if (spotImages[1].url) {
    if (spotImages[1].url.split(".").length) {
      const fileType = spotImages[1].url.split(".");

      if (
        fileType[fileType.length - 1] == "png" ||
        fileType[fileType.length - 1] == "jpg" ||
        fileType[fileType.length - 1] == "jpeg"
      ) {
        delete err.image1;
      } else {
        err.image1 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    }
  }

  if (spotImages[2].url) {
    if (spotImages[2].url.split(".").length) {
      const fileType = spotImages[2].url.split(".");

      if (
        fileType[fileType.length - 1] == "png" ||
        fileType[fileType.length - 1] == "jpg" ||
        fileType[fileType.length - 1] == "jpeg"
      ) {
        delete err.image2;
      } else {
        err.image2 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    }
  }

  if (spotImages[3].url) {
    if (spotImages[3].url.split(".").length) {
      const fileType = spotImages[3].url.split(".");

      if (
        fileType[fileType.length - 1] == "png" ||
        fileType[fileType.length - 1] == "jpg" ||
        fileType[fileType.length - 1] == "jpeg"
      ) {
        delete err.image3;
      } else {
        err.image3 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    }
  }
  if (spotImages[4].url) {
    if (spotImages[4].url.split(".").length) {
      const fileType = spotImages[4].url.split(".");

      if (
        fileType[fileType.length - 1] == "png" ||
        fileType[fileType.length - 1] == "jpg" ||
        fileType[fileType.length - 1] == "jpeg"
      ) {
        delete err.image4;
      } else {
        err.image4 = "Image URL must end in .png, .jpg, or .jpeg";
      }
    }
  }
  return err;
};

//! --------------------------------------------------------------------

export const checkSpotErrors = async (spot, price) => {
  if (spot.createdAt) return {};

  let err = { ...spot.errors };

  if (!price) err.price = "Price is required";

  return err;
};
