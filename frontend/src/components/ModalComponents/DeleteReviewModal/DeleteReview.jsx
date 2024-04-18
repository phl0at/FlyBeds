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
      <div>
        <h1>Confirm Delete</h1>
        <h5>Are you sure you want to remove this review?</h5>
        <div>
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
      </div>
    </>
  );
};

export default DeleteReview;
