import "./OneSpot.css";
import { IoStar } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpotThunk } from "../../store/spots";

const OneSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  useEffect(() => {
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);
  let hasImages = false;
  let mainImg = "";
  const otherImg = [];
  const spotData = useSelector((state) => state.spots);
  const {
    name,
    city,
    state,
    country,
    price,
    numReviews,
    SpotImages,
    Owner,
    avgRating,
    description,
  } = spotData;

  console.log("\n ================", spotData);

  // if SpotImages has length, set a boolean to true, iterate over each one, find the previewImage
  // and set it to its own variable, then put the rest of the images into an array
  if (SpotImages.length) {
    hasImages = true;
    SpotImages.forEach((img) => {
      if (img.preview) {
        mainImg = img.url;
      } else {
        otherImg.push(img.url);
      }
    });
  }

  return (
    <>
      <h1>{name}</h1>
      <h2>{`${city}, ${state}, ${country}`}</h2>
      <div className="images">
        <div className="main-image">{hasImages && <img src={mainImg} />}</div>
        <div className="other-images">
          {hasImages && otherImg.map((img, i) => <img key={i} src={img} />)}
        </div>
      </div>
      <h3>{`Hosted by ${Owner.firstName} ${Owner.lastName}`}</h3>
      <p>{description}</p>
      <div className="info-box">
        <div className="price">{`$${price} night`}</div>
        <div className="avg-rating">
          <IoStar />
          {avgRating ? avgRating : "New"}
        </div>
        <div className="num-reviews">{`${numReviews} reviews`}</div>
        <button onClick={() => alert("Feature coming soon!")}>Reserve</button>
      </div>
    </>
  );
};

export default OneSpot;
