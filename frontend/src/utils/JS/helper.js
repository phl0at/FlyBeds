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

export const calculateAvg = (arr) => {
  let sum = 0;
  let numReviews = arr.length;

  for (const review of arr) {
    sum += review.stars;
  }

  let avgRating = (sum / numReviews).toFixed(1).toString();
  
  if (avgRating.split(".").length < 2) avgRating += ".0";

  return { avgRating, numReviews };
};

export const checkReviewErrors = (review, rating) => {
  if (review.length < 10 || rating < 1) {
    return false;
  } else {
    return true;
  }
};

export const checkSpotErrors = async (
  country,
  address,
  city,
  state,
  lat,
  lng,
  description,
  name,
  price,
  previewImage,
  image1,
  image2,
  image3,
  image4,
  spot
) => {
  let err = {};

  if (spot.createdAt) return err;

  if (!country) err.country = "Country is required";

  if (!address) err.address = "Address is required";

  if (!city) err.city = "City is required";

  if (!state) err.state = "State is required";

  if (!lat) err.lat = "Latitude is required";

  if (!lng) err.lng = "Longitude is required";

  if (description.length < 30)
    err.description = "Description needs a minimum of 30 characters";

  if (!name) err.name = "Name is required";

  if (!price) err.price = "Price is required";

  if (!previewImage) err.previewImage = "Preview image is required";

  if (image1) {
    const urlSplit = image1.split(".");
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

  if (image2) {
    const urlSplit = image2.split(".");
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

  if (image3) {
    const urlSplit = image3.split(".");
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

  if (image4) {
    const urlSplit = image4.split(".");
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

  const spotData = await spot.json();
  err = { ...spotData.errors, ...err };

  return err;
};
