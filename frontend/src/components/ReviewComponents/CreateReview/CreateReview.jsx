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
      const { errors } = await newReview.json();
      setErrors(errors);
    }
  };

  return (
    <div className="review-form">
      <h2>Post Your Review</h2>
      <div color="red" className="errors">
        {Object.values(errors).length && errors.stars
          ? errors.stars
          : errors.review}
      </div>
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
