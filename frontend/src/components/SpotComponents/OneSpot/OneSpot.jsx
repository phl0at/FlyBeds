import { getAllReviewsThunk, getReviewArray } from "../../../store/reviews";
import { calculateAvg, sortImages } from "../../../utils/JS/helper";
import SpotReviews from "../SpotReviews/SpotReviews";
import { getOneSpotThunk } from "../../../store/spots";
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
  let { avgRating, numReviews } = calculateAvg(spotReviews);
  const notNum = avgRating.split(".")[0] === "NaN";

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
      <main className="one-spot-page">
        <div className="heading">
          <h1 className="title">{name}</h1>
          <h3 className="location">{`${city}, ${state}, ${country}`}</h3>
        </div>
        <div className="all-images">
          {!hasImages && <div>No images</div>}
          <div className="preview-box">
            {hasImages && <img className="preview-image" src={mainImg} />}
          </div>
          <div className="other-box">
            {hasImages &&
              otherImg.map((img, i) => (
                <img className="other-image" key={i} src={img} />
              ))}
          </div>
        </div>
        <div className="info-box">
          <div className="price">
            <h4>{`$${price} / night`}</h4>
          </div>
          <div className="rating-review">
            <h6>
              <IoStar className="blue" />{" "}
              {notNum ? "New" : avgRating} •{" "}
              {numReviews === 1
                ? `${numReviews} Review`
                : `${numReviews} Reviews`}
            </h6>
          </div>
          <button
            className="shadow"
            onClick={() => alert("Feature coming soon!")}
          >
            Reserve
          </button>
        </div>
        <div className="description-box">
          <h3>{`Hosted by ${Owner.firstName} ${Owner.lastName}`}</h3>
          <h5 className="description">{description}</h5>
        </div>

        <div className="reviews">
          <SpotReviews
            notNum={notNum}
            reviewData={spotReviews}
            spotId={spotId}
            avgRating={avgRating}
            numReviews={numReviews}
          />
        </div>
      </main>
    </>
  );
};

export default OneSpot;
