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
      <div className="delete-spot-menu">
        <h1 className="header">Confirm Delete</h1>
        <h5 className="header">Are you sure you want to remove this spot?</h5>

        <button
          onClick={() => {
            onClick(spotId);
          }}
          className="red delete-button shadow"
        >
          Yes (Delete Spot)
        </button>
        <button
          className="grey keep-button shadow"
          onClick={() => {
            closeModal();
          }}
        >
          No (Keep Spot)
        </button>
      </div>
    </>
  );
};

export default DeleteSpot;
