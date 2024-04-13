import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./CreateSpot.css";
import { checkForErrors } from "./formValidation";

const CreateSpot = () => {
  const currUser = useSelector((state) => state.session.user);
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCountry("");
    setStreet("");
    setCity("");
    setState("");
    setDescription("");
    setName("");
    setPrice("");
    setPreviewImage("");
    setImage1("");
    setImage2("");
    setImage3("");
    setImage4("");
    setErrors({});
  }, []);
  
  const onSubmit = (e) => {
    e.preventDefault();

    const err = checkForErrors(
      country,
      street,
      city,
      state,
      description,
      name,
      price,
      previewImage,
      image1,
      image2,
      image3,
      image4,
    );

    setErrors(err);
  };
  return (
    <div className="create-form">
      <h1>Create a new Spot</h1>
      <h3>Where's your place located?</h3>
      <h5>
        Guests will only get your exact address once they booked a reservation.
      </h5>
      <form onSubmit={onSubmit}>
        <div className="spot-location">
          <label for="country">Country</label>
          {errors.country && (
            <div color="red" className="errors">
              {errors.country}
            </div>
          )}
          <input
            name="country"
            type="text"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <label for="street">Street Address</label>
          {errors.street && (
            <div color="red" className="errors">
              {errors.street}
            </div>
          )}
          <input
            name="street"
            type="text"
            value={street}
            placeholder="Street Address"
            onChange={(e) => setStreet(e.target.value)}
          />
          <label for="city">City</label>
          {errors.city && (
            <div color="red" className="errors">
              {errors.city}
            </div>
          )}
          <input
            name="city"
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
          <label for="state">State</label>
          {errors.state && (
            <div color="red" className="errors">
              {errors.state}
            </div>
          )}
          <input
            name="state"
            type="text"
            value={state}
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="spot-description">
          <label for="description">Describe your place to guests</label>
          <h5>
            Mention the best features of your space, and any special amenities
            like fast wifi or parking and what you love about the neighborhood.
          </h5>
          <textarea
            name="spot-description"
            value={description}
            placeholder="Please write at least 30 characters"
            rows="10"
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <div color="red" className="errors">
              {errors.description}
            </div>
          )}
        </div>
        <div className="spot-name">
          <label for="name">Create a title for your spot</label>
          <h5>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </h5>
          <input
            name="name"
            type="text"
            value={name}
            placeholder="Name your spot"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <div color="red" className="errors">
              {errors.name}
            </div>
          )}
        </div>
        <div className="spot-price">
          <label for="price">Set a base price for your spot</label>
          <h5>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </h5>
          <div id="$">$</div>
          <input
            name="price"
            type="text"
            value={price}
            placeholder="Price per night (USD)"
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && (
            <div color="red" className="errors">
              {errors.price}
            </div>
          )}
        </div>
        <div className="spot-images">
          <label for="preview-image">Liven up your spot with photos</label>
          <h5>Submit a link to at least one photo to publish your spot.</h5>
          <input
            className="preview-image"
            name="preview-image"
            type="text"
            value={previewImage}
            placeholder="Preview Image URL"
            onChange={(e) => setPreviewImage(e.target.value)}
          />
          {errors.previewImage && (
            <div color="red" className="errors">
              {errors.previewImage}
            </div>
          )}
          <input
            className="images"
            name="image1"
            type="text"
            value={image1}
            placeholder="Image URL"
            onChange={(e) => setImage1(e.target.value)}
          />
          {errors.image1 && (
            <div color="red" className="errors">
              {errors.image1}
            </div>
          )}
          <input
            className="images"
            name="image2"
            type="text"
            value={image2}
            placeholder="Image URL"
            onChange={(e) => setImage2(e.target.value)}
          />
          {errors.image2 && (
            <div color="red" className="errors">
              {errors.image2}
            </div>
          )}
          <input
            className="images"
            name="image3"
            type="text"
            value={image3}
            placeholder="Image URL"
            onChange={(e) => setImage3(e.target.value)}
          />
          {errors.image3 && (
            <div color="red" className="errors">
              {errors.image3}
            </div>
          )}
          <input
            className="images"
            name="image4"
            type="text"
            value={image4}
            placeholder="Image URL"
            onChange={(e) => setImage4(e.target.value)}
          />
          {errors.image4 && (
            <div color="red" className="errors">
              {errors.image4}
            </div>
          )}
        </div>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default CreateSpot;
