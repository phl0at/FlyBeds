import { getAllReviewsThunk, getReviewArray } from "../../store/reviews";
import { calculateAvg, sortImages } from "../../utils/JS/helper";
import SpotReviews from "../SpotReviews/SpotReviews";
import { getOneSpotThunk } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { useEffect } from "react";
import "./OneSpot.css";

const OneSpot = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotReviews = useSelector(getReviewArray);
  const spotData = useSelector((state) => state.spots);
  const { avgRating, numReviews } = calculateAvg(spotReviews);

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
    dispatch(getOneSpotThunk(spotId));
  }, [dispatch, spotId]);

  if (!spotData[spotId])
    return <h2>{`Loading details about Spot #${spotId}...`}</h2>;

  const {
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

  if (!SpotImages) return <h2>{`Loading details about Spot #${spotId}...`}</h2>;
  const { hasImages, mainImg, otherImg } = sortImages(SpotImages);

  return (
    <>
      <h1>{name}</h1>
      <h2>{`${city}, ${state}, ${country}`}</h2>
      <div className="images">
        {!hasImages && <div>No images</div>}
        <div className="main-img">{hasImages && <img src={mainImg} />}</div>
        <div className="other-img">
          {hasImages &&
            otherImg.map((img, i) => (
              <img className="single-img" key={i} src={img} />
            ))}
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
