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

//! --------------------------------------------------------------------

export const checkSpotErrors = async (spot, spotImages, price) => {
  // My backend does not have any errors to check for what previewImage is
  // so when I bad url is submitted but all other data is ok,
  // no errors are thrown and the spot is updated with a broken
  // image. refactor to check previewImages before we check
  // if the spot was created
  if (spot.createdAt) return {};
  console.log('==========================',spotImages)

  let err = { ...spot.errors };

  if (spot.errors.description) {
    err.description = "Description needs a minimum of 30 characters";
  }

  if (!price) err.price = "Price is required";
  if (!spotImages[0].url) {
    err.previewImage = "Preview image is required";
  } else {
    const urlSplit = spotImages[0].url.split(".");

    if (
      urlSplit[urlSplit.length - 1] == "png" ||
      urlSplit[urlSplit.length - 1] == "jpg" ||
      urlSplit[urlSplit.length - 1] == "jpeg"
    ) {
      err.previewImage = null;
    } else {
      err.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
    }
  }

  if (spotImages[1].url) {
    const urlSplit = spotImages[1].url.split(".");
    if (
      urlSplit[urlSplit.length - 1] == "png" ||
      urlSplit[urlSplit.length - 1] == "jpg" ||
      urlSplit[urlSplit.length - 1] == "jpeg"
    ) {
      err.image1 = null;
    } else {
      err.image1 = "Image URL must end in .png, .jpg, or .jpeg";
    }
  }

  if (spotImages[2].url) {
    const urlSplit = spotImages[2].url.split(".");
    if (
      urlSplit[urlSplit.length - 1] == "png" ||
      urlSplit[urlSplit.length - 1] == "jpg" ||
      urlSplit[urlSplit.length - 1] == "jpeg"
    ) {
      err.image2 = null;
    } else {
      err.image2 = "Image URL must end in .png, .jpg, or .jpeg";
    }
  }

  if (spotImages[3].url) {
    const urlSplit = spotImages[3].url.split(".");
    if (
      urlSplit[urlSplit.length - 1] == "png" ||
      urlSplit[urlSplit.length - 1] == "jpg" ||
      urlSplit[urlSplit.length - 1] == "jpeg"
    ) {
      err.image3 = null;
    } else {
      err.image3 = "Image URL must end in .png, .jpg, or .jpeg";
    }
  }

  if (spotImages[4].url) {
    const urlSplit = spotImages[4].url.split(".");
    if (
      urlSplit[urlSplit.length - 1] == "png" ||
      urlSplit[urlSplit.length - 1] == "jpg" ||
      urlSplit[urlSplit.length - 1] == "jpeg"
    ) {
      err.image4 = null;
    } else {
      err.image4 = "Image URL must end in .png, .jpg, or .jpeg";
    }
  }

  return err;
};
