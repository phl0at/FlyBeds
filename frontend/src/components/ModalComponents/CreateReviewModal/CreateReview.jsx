import { checkReviewErrors } from "../../../utils/JS/helper";
import { createReviewThunk } from "../../../store/reviews";
import { useModal } from "../../../context/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { GiBed } from "react-icons/gi";
import "./CreateReview.css";

const CreateReview = ({ spotId }) => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [enabled, setEnabled] = useState(true);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    setReview("");
    setStars(0);
    setEnabled(true);
    setErrors({});
  }, []);

  useEffect(() => {
    setEnabled(checkReviewErrors(review, stars));
  }, [setEnabled, review, stars]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newReview = await dispatch(
      createReviewThunk(review, stars, spotId, currUser)
    );

    if (newReview.createdAt) {
      closeModal();
    } else {
      const { errors } = newReview;
      setErrors(errors);
    }
  };

  return (
    <div className="review-menu">
      <div className="header">
        <h2>How was your stay?</h2>
      </div>
      <div className="review-error errors">
        {Object.values(errors).length && errors.stars
          ? errors.stars
          : errors.review}
      </div>
      <form className="review-form" onSubmit={onSubmit}>
        <textarea
          className="review-text input"
          name="Review"
          rows="10"
          value={review}
          placeholder="Leave your review here..."
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <input
          className="stars input"
          name="stars"
          type="number"
          value={stars}
          min={0}
          max={5}
          onChange={(e) => {
            setStars(Number(e.target.value));
          }}
        />
        <label className="stars-label" htmlFor="stars">
          Stars
        </label>
        <button
          disabled={!enabled}
          className={`review-button ${!enabled ? "grey" : null} shadow`}
          type="submit"
        >
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
