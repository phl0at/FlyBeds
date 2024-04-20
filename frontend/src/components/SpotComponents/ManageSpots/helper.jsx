import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteSpot from "../../ModalComponents/DeleteSpotModal/DeleteSpot";
import { IoStar } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./ManageSpots.css";

export const UserSpots = ({ spot }) => {
  return (
    <>
      <div className="spot-card">
        <NavLink to={`/spot/${spot.id}`}>
          <span className="tooltiptext">{spot.name}</span>
          <div className="spot-image">
            <img title={spot.name} src={spot.previewImage} />
          </div>
          <div className="info-container">
            <div className="spot-info-left">
              <div>
                {spot.city}, {spot.state}{" "}
              </div>
              <div>{`$${spot.price} / night`}</div>
            </div>
            <div className="spot-info-right">
              <div>
                <IoStar /> {spot.avgRating ? spot.avgRating : "New"}
              </div>
            </div>
          </div>
        </NavLink>
        <div className="modify-buttons">
          <button className="shadow update">
            <NavLink to={`/spot/${spot.id}/update`}>Update</NavLink>
          </button>
          <OpenModalMenuItem
            className="delete"
            itemText="Delete"
            modalComponent={<DeleteSpot spotId={spot.id} />}
          />
        </div>
      </div>
    </>
  );
};
