import { deleteSpotThunk } from "../../../store/spots";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import "./DeleteSpot.css";

const DeleteSpot = ({ spotId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const onClick = async (spotId) => {
    try {
      await dispatch(deleteSpotThunk(spotId));
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
        <h5>Are you sure you want to remove this spot?</h5>
        <div>
          <button
            onClick={() => {
              onClick(spotId);
            }}
            className="red shadow"
          >
            Yes (Delete Spot)
          </button>
          <button
            className="grey shadow"
            onClick={() => {
              closeModal();
            }}
          >
            No (Keep Spot)
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteSpot;
