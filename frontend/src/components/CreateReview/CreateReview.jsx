import { checkReviewErrors } from "../../utils/JS/helper";
import { createReviewThunk } from "../../store/reviews";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { GiBed } from "react-icons/gi";
import "./CreateReview.css";

const CreateReview = ({ spotId }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setReview("");
    setStars(0);
    setEnabled(true);
  }, []);

  useEffect(() => {
    setEnabled(checkReviewErrors(review, stars));
  }, [setEnabled, checkReviewErrors, review, stars]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const reviewRes = await dispatch(createReviewThunk(review, stars, spotId));
    const reviewsArr = await reviewRes.json()

  };

  return (
    <div className="review-form">
      <h2>Post Your Review</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="Review">How was your stay?</label>
        <textarea
          name="Review"
          rows="10"
          value={review}
          placeholder="Leave your review here..."
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <input
          name="stars"
          type="number"
          value={stars}
          min={0}
          max={5}
          onChange={(e) => {
            setStars(Number(e.target.value));
          }}
        />
        <label htmlFor="stars">Stars</label>
        <button disabled={!enabled} type="submit">
          Submit Your Review
        </button>
        {/* <div className="rating-input">
          <div className="filled">
            <GiBed />
          </div>
          <div className="filled">
            <GiBed />
          </div>
          <div className="filled">
            <GiBed />
          </div>
          <div className="filled">
            <GiBed />
          </div>
          <div className="filled">
            <GiBed />
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default CreateReview;
