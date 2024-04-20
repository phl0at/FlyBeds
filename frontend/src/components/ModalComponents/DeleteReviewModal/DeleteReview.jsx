import { deleteReviewThunk } from "../../../store/reviews";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import "./DeleteReview.css";

const DeleteReview = ({ reviewId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const onClick = async (reviewId) => {
    try {
      await dispatch(deleteReviewThunk(reviewId));
      closeModal();
    } catch (e) {
      closeModal();
      return e;
    }
  };

  return (
    <>
      <div className="delete-review-menu">
        <h1 className="header">Confirm Delete</h1>
        <h5 className="header">Are you sure you want to remove this review?</h5>

        <button
          onClick={() => {
            onClick(reviewId);
          }}
          className="red shadow"
        >
          Yes (Delete Review)
        </button>
        <button
          className="grey shadow"
          onClick={() => {
            closeModal();
          }}
        >
          No (Keep Review)
        </button>
      </div>
    </>
  );
};

export default DeleteReview;
