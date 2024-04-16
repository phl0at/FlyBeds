import { getAllReviewsThunk, getReviewArray } from "../../store/reviews";
import SpotReviews from "../SpotReviews/SpotReviews";
import { getOneSpotThunk } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { useEffect } from "react";
import "./OneSpot.css";
import { calculateAvg } from "../../utils/JS/helper";

const OneSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotData = useSelector((state) => state.spots);
  const spotReviews = useSelector(getReviewArray);
  let { avgRating, numReviews } = calculateAvg(spotReviews);

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  if (!spotData[spotId]) return <h2>Loading...</h2>;

  let {
    [Number(spotId)]: {
      name,
      city,
      state,
      country,
      price,
      SpotImages,
      Owner,
      description,
    },
  } = spotData;

  if (!SpotImages) return <h2>Loading...</h2>;

  let hasImages = false;
  let mainImg = "";
  const otherImg = [];

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
        {!hasImages && <div>No images</div>}
        <div className="main-image">{hasImages && <img src={mainImg} />}</div>
        <div className="other-images">
          {hasImages && otherImg.map((img, i) => <img key={i} src={img} />)}
        </div>
      </div>
      <h3>{`Hosted by ${Owner.firstName} ${Owner.lastName}`}</h3>
      <p>{description}</p>
      <div className="info-box">
        <div className="price">{`$${price} / night`}</div>
        <div className="rating-review">
          <IoStar />
          {avgRating ? avgRating : "New"} •{" "}
          {numReviews === 1 ? `${numReviews} Review` : `${numReviews} Reviews`}
        </div>
        <button onClick={() => alert("Feature coming soon!")}>Reserve</button>
      </div>
      <div className="reviews">
        <SpotReviews
          reviewData={spotReviews}
          spotId={spotId}
          avgRating={avgRating}
          numReviews={numReviews}
        />
      </div>
    </>
  );
};

export default OneSpot;
