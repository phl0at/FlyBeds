export const checkFrontEndErrors = (
  country,
  street,
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
  image4
) => {
  const err = {};

  if (!country) err.country = "Country is required";

  if (!street) err.street = "Address is required";

  if (!city) err.city = "City is required";

  if (!state) err.state = "State is required";

  if (!street) err.street = "Address is required";

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

  return err;
};

export const checkBackEndErrors = async (spot) => {
  let err = {};
  
  if (spot.createdAt) {
    return err;
  } else {
    const spotData = await spot.json();
    err = { ...spotData.errors };
    return err;
  }
};
