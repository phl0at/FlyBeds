import { checkSpotErrors, checkImageErrors } from "../../../utils/JS/helper";
import { createSpotThunk, addImagesThunk } from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CreateSpot.css";

const CreateSpot = () => {
  const loggedIn = useSelector((state) => state.session.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({});
    setErrors({});
  }, []);

  const {
    country,
    address,
    city,
    lat,
    lng,
    state,
    description,
    name,
    price,
    previewImage,
    image1,
    image2,
    image3,
    image4,
  } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();

    let errorObj = {};
    let newSpot = {};
    let spotErrors = {};
    if (loggedIn) {
      const spotData = {
        country,
        address,
        city,
        lat: lat ? lat : 1,
        lng: lng ? lng : 1,
        state,
        description,
        name,
        price: Number(price),
      };

      const spotImages = [
        { url: previewImage, preview: true },
        { url: image1, preview: false },
        { url: image2, preview: false },
        { url: image3, preview: false },
        { url: image4, preview: false },
      ];

      const imgErrors = checkImageErrors(spotImages);

      if (!Object.values(imgErrors).length) {
        newSpot = {
          ...(await dispatch(createSpotThunk(spotData, spotImages, loggedIn))),
        };
        spotErrors = { ...(await checkSpotErrors(newSpot, price)) };
        if (!Object.values(spotErrors).length) {
          await dispatch(addImagesThunk(newSpot, spotImages));
        }
      }

      errorObj = { ...spotErrors, ...imgErrors };

      Object.values(errorObj).length
        ? setErrors(errorObj)
        : navigateTo(`/spot/${newSpot.id}`);
    } else {
      return alert("You must be signed in to create a spot!");
    }
  };

  return (
    <div className="create-form">
      <h1>Create a new Spot</h1>
      <h3>{`Where's your place located?`}</h3>
      <h5>
        Guests will only get your exact address once they booked a reservation.
      </h5>
      <form onSubmit={onSubmit}>
        <div className="spot-location">
          {/*
      //!-------------------------------------------------------------------
      //?---------------------- LOCATION INPUTS ----------------------------
      //!-------------------------------------------------------------------
      */}
          <label htmlFor="Country">Country</label>
          {errors.country && (
            <div color="red" className="errors">
              {errors.country}
            </div>
          )}
          <input
            type="text"
            value={country}
            name="Country"
            placeholder="Country"
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
          {/*
          //!-------------------------------------------------------------------
          */}
          <label htmlFor="Address">Street Address</label>
          {errors.address && (
            <div color="red" className="errors">
              {errors.address}
            </div>
          )}
          <input
            type="text"
            value={address}
            name="Address"
            placeholder="Address"
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
            }}
          />
          {/*
          //!-------------------------------------------------------------------
          */}
          <label htmlFor="City">City</label>
          {errors.city && (
            <div color="red" className="errors">
              {errors.city}
            </div>
          )}
          <input
            type="text"
            value={city}
            name="City"
            placeholder="City"
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
            }}
          />
          {/*
          //!-------------------------------------------------------------------
          */}
          <label htmlFor="State">State</label>
          {errors.state && (
            <div color="red" className="errors">
              {errors.state}
            </div>
          )}
          <input
            type="text"
            value={state}
            name="State"
            placeholder="State"
            onChange={(e) => {
              setFormData({ ...formData, state: e.target.value });
            }}
          />
          {/*
          //!-------------------------------------------------------------------
          */}
          <label htmlFor="Latitude">Latitude</label>
          {errors.lat && (
            <div color="red" className="errors">
              {errors.lat}
            </div>
          )}
          <input
            type="text"
            value={lat}
            name="Latitude"
            placeholder="Latitude"
            onChange={(e) => {
              setFormData({ ...formData, lat: e.target.value });
            }}
          />
          {/*
          //!-------------------------------------------------------------------
          */}
          <label htmlFor="Longitude">Longitude</label>
          {errors.lng && (
            <div color="red" className="errors">
              {errors.lng}
            </div>
          )}
          <input
            type="text"
            value={lng}
            name="Longitude"
            placeholder="Longitude"
            onChange={(e) => {
              setFormData({ ...formData, lng: e.target.value });
            }}
          />
        </div>
        {/*
        //!-------------------------------------------------------------------
        //?------------------------ DESCRIPTION ------------------------------
        //!-------------------------------------------------------------------
        */}
        <div className="spot-description">
          <label htmlFor="description">Describe your place to guests</label>
          <h5>
            Mention the best features of your space, and any special amenities
            like fast wifi or parking and what you love about the neighborhood.
          </h5>
          <textarea
            name="spot-description"
            value={description}
            placeholder="Please write at least 30 characters"
            rows="10"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {errors.description && (
            <div color="red" className="errors">
              {errors.description}
            </div>
          )}
        </div>
        {/*
        //!-------------------------------------------------------------------
        //?----------------------- NAME/TITLE --------------------------------
        //!-------------------------------------------------------------------
        */}
        <div className="spot-name">
          <label htmlFor="Name your Spot">Create a title for your spot</label>
          <h5>
            {`Catch guests' attention with a spot title that highlights what makes
            your place special.`}
          </h5>
          <input
            type="text"
            value={name}
            name="Name"
            placeholder="Name"
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          {errors.name && (
            <div color="red" className="errors">
              {errors.name}
            </div>
          )}
        </div>
        {/*
        //!-------------------------------------------------------------------
        //?--------------------------- PRICE ---------------------------------
        //!-------------------------------------------------------------------
        */}
        <div className="spot-price">
          <label htmlFor="Price per night (USD)">
            Set a base price for your spot
          </label>
          <h5>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </h5>
          <div id="$">$</div>
          <input
            type="text"
            value={price}
            name="Price"
            placeholder="Price"
            onChange={(e) => {
              setFormData({ ...formData, price: e.target.value });
            }}
          />
          {errors.price && (
            <div color="red" className="errors">
              {errors.price}
            </div>
          )}
        </div>

        {/*
        //!-------------------------------------------------------------------
        //?-------------------------- IMAGES ---------------------------------
        //!-------------------------------------------------------------------
        */}

        <div className="spot-images">
          <label htmlFor="Preview Image URL">
            Liven up your spot with photos
          </label>
          <h5>Submit a link to at least one photo to publish your spot.</h5>
          <input
            type="text"
            value={previewImage}
            name="Preview Image URL"
            placeholder="Preview Image URL"
            onChange={(e) => {
              setFormData({ ...formData, previewImage: e.target.value });
            }}
          />
          {errors.previewImage && (
            <div color="red" className="errors">
              {errors.previewImage}
            </div>
          )}

          {/*
          //!-------------------------------------------------------------------
          */}

          <input
            type="text"
            value={image1}
            name="Image URL"
            placeholder="Image URL"
            onChange={(e) => {
              setFormData({ ...formData, image1: e.target.value });
            }}
          />
          {errors.image1 && (
            <div color="red" className="errors">
              {errors.image1}
            </div>
          )}

          {/*
          //!-------------------------------------------------------------------
          */}

          <input
            type="text"
            value={image2}
            name="Image URL"
            placeholder="Image URL"
            onChange={(e) => {
              setFormData({ ...formData, image2: e.target.value });
            }}
          />
          {errors.image2 && (
            <div color="red" className="errors">
              {errors.image2}
            </div>
          )}

          {/*
          //!-------------------------------------------------------------------
          */}
          <input
            type="text"
            value={image3}
            name="Image URL"
            placeholder="Image URL"
            onChange={(e) => {
              setFormData({ ...formData, image3: e.target.value });
            }}
          />
          {errors.image3 && (
            <div color="red" className="errors">
              {errors.image3}
            </div>
          )}
          {/*
          //!-------------------------------------------------------------------
          */}
          <input
            type="text"
            value={image4}
            name="Image URL"
            placeholder="Image URL"
            onChange={(e) => {
              setFormData({ ...formData, image4: e.target.value });
            }}
          />
          {errors.image4 && (
            <div color="red" className="errors">
              {errors.image4}
            </div>
          )}
        </div>
        {/*
        //!-------------------------------------------------------------------
        //?----------------------- SUBMIT BUTTON -----------------------------
        //!-------------------------------------------------------------------
        */}
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default CreateSpot;
