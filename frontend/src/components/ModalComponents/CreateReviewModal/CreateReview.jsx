import { checkReviewErrors } from "../../../utils/JS/helper";
import { createReviewThunk } from "../../../store/reviews";
import { useModal } from "../../../context/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoStar } from "react-icons/io5";
import "./CreateReview.css";

const CreateReview = ({ spotId }) => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const [activeRating, setActiveRating] = useState(0);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [enabled, setEnabled] = useState(true);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const onChange = (number) => {
    setStars(parseInt(number));
  };

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
        <div className="rating-input">
          <div
            onMouseEnter={() => {
              setActiveRating(1);
            }}
            onMouseLeave={() => {
              setActiveRating(stars);
            }}
            onClick={() => {
              onChange(1);
            }}
            className={activeRating >= 1 ? "filled" : "empty"}
          >
            <IoStar />
          </div>
          <div
            onMouseEnter={() => {
              setActiveRating(2);
            }}
            onMouseLeave={() => {
              setActiveRating(stars);
            }}
            onClick={() => {
              onChange(2);
            }}
            className={activeRating >= 2 ? "filled" : "empty"}
          >
            <IoStar />
          </div>
          <div
            onMouseEnter={() => {
              setActiveRating(3);
            }}
            onMouseLeave={() => {
              setActiveRating(stars);
            }}
            onClick={() => {
              onChange(3);
            }}
            className={activeRating >= 3 ? "filled" : "empty"}
          >
            <IoStar />
          </div>
          <div
            onMouseEnter={() => {
              setActiveRating(4);
            }}
            onMouseLeave={() => {
              setActiveRating(stars);
            }}
            onClick={() => {
              onChange(4);
            }}
            className={activeRating >= 4 ? "filled" : "empty"}
          >
            <IoStar />
          </div>
          <div
            onMouseEnter={() => {
              setActiveRating(5);
            }}
            onMouseLeave={() => {
              setActiveRating(stars);
            }}
            onClick={() => {
              onChange(5);
            }}
            className={activeRating >= 5 ? "filled" : "empty"}
          >
            <IoStar />
          </div>
        </div>
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
      </form>
    </div>
  );
};

export default CreateReview;
