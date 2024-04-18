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

export const checkFormErrors = (
  { country, address, city, lat, lng, state, description, name, price },
  [previewImage, image1, image2, image3, image4]
) => {
  const err = {};
  if (!country) err.country = "Country is required";
  if (!address) err.address = "Address is required";
  if (!city) err.city = "City is required";
  if (!state) err.state = "State is required";

  if (!description || description.length < 30)
    err.description = "Description needs a minimum 30 characters";

  if (!name) err.name = "Name is required";
  if (!price) err.price = "Price is required";

  if (lat < -90 || lat > 90) err.lat = "Latitude must be within -90 and 90";

  if (lng < -180 || lng > 180) err.lng = "Longitude muse be within -180 and 180";

  if (previewImage.url == undefined) {
    err.previewImage = "Preview Image is required";
  } else {
    const fileType =
      previewImage.url.split(".")[previewImage.url.split(".").length - 1];

    if (fileType == "png" || fileType == "jpg" || fileType == "jpeg") {
      delete err.previewImage;
    } else {
      err.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
    }
  }
  if (image1.url) {
    const fileType = image1.url.split(".")[image1.url.split(".").length - 1];

    if (fileType == "png" || fileType == "jpg" || fileType == "jpeg") {
      delete err.image1;
    } else {
      err.image1 = "Image URL must end in .png, .jpg, or .jpeg";
    }
  }
  if (image2.url) {
    const fileType = image2.url.split(".")[image2.url.split(".").length - 1];

    if (fileType == "png" || fileType == "jpg" || fileType == "jpeg") {
      delete err.image2;
    } else {
      err.image2 = "Image URL must end in .png, .jpg, or .jpeg";
    }
  }
  if (image3.url) {
    const fileType = image3.url.split(".")[image3.url.split(".").length - 1];

    if (fileType == "png" || fileType == "jpg" || fileType == "jpeg") {
      delete err.image3;
    } else {
      err.image3 = "Image URL must end in .png, .jpg, or .jpeg";
    }
  }
  if (image4.url) {
    const fileType = image4.url.split(".")[image4.url.split(".").length - 1];

    if (fileType == "png" || fileType == "jpg" || fileType == "jpeg") {
      delete err.image4;
    } else {
      err.image4 = "Image URL must end in .png, .jpg, or .jpeg";
    }
  }

  return err;
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
