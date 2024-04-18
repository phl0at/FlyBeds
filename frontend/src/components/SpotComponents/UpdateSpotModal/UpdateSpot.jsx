import {
  addImagesThunk,
  clearSpots,
  getOneSpotThunk,
  updateSpotThunk,
} from "../../../store/spots";
import { checkFormErrors } from "../../../utils/JS/helper";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./UpdateSpot.css";

const UpdateSpot = () => {
  const { spotId } = useParams();
  const currUser = useSelector((state) => state.session.user);
  const spotData = useSelector((state) => state.spots[spotId]);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...spotData });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, []);

  useEffect(() => {
    dispatch(clearSpots());
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  if (!spotData) {
    return <>Loading...</>;
  }

  const {
    address,
    city,
    state,
    country,
    name,
    price,
    description,
    lat,
    lng,
    previewImage,
    image1,
    image2,
    image3,
    image4,
  } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (currUser) {
      const updatedSpot = {
        id: spotData.id,
        country,
        address,
        city,
        lat: lat ? lat : 1,
        lng: lng ? lng : 1,
        state,
        description,
        name,
        price,
      };

      const spotImages = [
        { url: previewImage, preview: true },
        { url: image1, preview: false },
        { url: image2, preview: false },
        { url: image3, preview: false },
        { url: image4, preview: false },
      ];

      const err = checkFormErrors(updatedSpot, spotImages);

      if (Object.values(err).length) {
        setErrors(err);
      } else {
        const newSpot = await dispatch(
          updateSpotThunk(updatedSpot, spotImages, currUser)
        );
        if (newSpot.errors) {
          setErrors(newSpot.errors);
        } else {
          await dispatch(addImagesThunk(newSpot, spotImages));
          navigateTo(`/spot/${newSpot.id}`);
        }
      }
    } else {
      return alert("You must be signed in to edit a spot!");
    }
  };

  return (
    <div className="update-form">
      <h1>Update your Spot</h1>
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
        <button type="submit">Update Your Spot</button>
      </form>
    </div>
  );
};

export default UpdateSpot;
