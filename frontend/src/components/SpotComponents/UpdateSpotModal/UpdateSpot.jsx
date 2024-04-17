import {
  clearSpots,
  getOneSpotThunk,
  updateSpotThunk,
} from "../../../store/spots";
import { checkSpotErrors } from "../../../utils/JS/helper";
import { textInput } from "./helper";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./UpdateSpot.css";

const UpdateSpot = () => {
  const loggedIn = useSelector((state) => state.session.user);
  const spotData = useSelector((state) => state.spots);
  const { spotId } = useParams();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    setCountry("");
    setAddress("");
    setCity("");
    setState("");
    setLat("");
    setLng("");
    setDescription("");
    setName("");
    setPrice("");
    setPreviewImage("");
    setImage1("");
    setImage2("");
    setImage3("");
    setImage4("");
    dispatch(clearSpots());
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  if (!spotData[spotId]) return <>Loading...</>;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loggedIn) {
      const updatedSpot = {
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

      const newSpot = await dispatch(updateSpotThunk(updatedSpot));

      const err = await checkSpotErrors(
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
        newSpot
      );

      Object.values(err).length
        ? setErrors(err)
        : navigateTo(`/spot/${newSpot.id}`);
    } else {
      return alert("You must be signed in to edit a spot!");
    }
  };

  return (
    <div className="create-form">
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
          {textInput(country, "Country", setCountry, spotData[spotId])}
          {/*
          //!-------------------------------------------------------------------
          */}
          <label htmlFor="Address">Street Address</label>
          {errors.address && (
            <div color="red" className="errors">
              {errors.address}
            </div>
          )}
          {textInput(address, "Address", setAddress, spotData[spotId])}
          {/*
          //!-------------------------------------------------------------------
          */}
          <label htmlFor="City">City</label>
          {errors.city && (
            <div color="red" className="errors">
              {errors.city}
            </div>
          )}
          {textInput(city, "City", setCity, spotData[spotId])}
          {/*
          //!-------------------------------------------------------------------
          */}
          <label htmlFor="State">State</label>
          {errors.state && (
            <div color="red" className="errors">
              {errors.state}
            </div>
          )}
          {textInput(state, "State", setState, spotData[spotId])}
          {/*
          //!-------------------------------------------------------------------
          */}
          <label htmlFor="Latitude">Latitude</label>
          {errors.lat && (
            <div color="red" className="errors">
              {errors.lat}
            </div>
          )}
          {textInput(lat, "Latitude", setLat, spotData[spotId])}
          {/*
          //!-------------------------------------------------------------------
          */}
          <label htmlFor="Longitude">Longitude</label>
          {errors.lng && (
            <div color="red" className="errors">
              {errors.lng}
            </div>
          )}
          {textInput(lng, "Longitude", setLng, spotData[spotId])}
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
            onChange={(e) => setDescription(e.target.value)}
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
          {textInput(name, "Name your Spot", setName, spotData[spotId])}
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
          {textInput(
            price,
            "Price per night (USD)",
            setPrice,
            spotData[spotId]
          )}
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
          {textInput(
            previewImage,
            "Preview Image URL",
            setPreviewImage,
            spotData
          )}
          {errors.previewImage && (
            <div color="red" className="errors">
              {errors.previewImage}
            </div>
          )}
          {/*
          //!-------------------------------------------------------------------
          */}
          {textInput(image1, "Image URL", setImage1, spotData[spotId])}
          {errors.image1 && (
            <div color="red" className="errors">
              {errors.image1}
            </div>
          )}
          {/*
          //!-------------------------------------------------------------------
          */}
          {textInput(image2, "Image URL", setImage2, spotData[spotId])}
          {errors.image2 && (
            <div color="red" className="errors">
              {errors.image2}
            </div>
          )}
          {/*
          //!-------------------------------------------------------------------
          */}
          {textInput(image3, "Image URL", setImage3, spotData[spotId])}
          {errors.image3 && (
            <div color="red" className="errors">
              {errors.image3}
            </div>
          )}
          {/*
          //!-------------------------------------------------------------------
          */}
          {textInput(image4, "Image URL", setImage4, spotData[spotId])}
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

export default UpdateSpot;
