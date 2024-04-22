import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteSpot from "../../ModalComponents/DeleteSpotModal/DeleteSpot";
import { IoStar } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import "./ManageSpots.css";

export const UserSpots = ({ spot }) => {
  return (
    <>
      <div className="manage-spot-card">
        <NavLink to={`/spot/${spot.id}`}>
          <div className="manage-spot-image">
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
                <IoStar className="blue" />{" "}
                {spot.avgRating ? spot.avgRating : "New"}
              </div>
            </div>
          </div>
        </NavLink>
        <div className="modify-buttons">
          <NavLink to={`/spot/${spot.id}/update`}>
            <button className="shadow update">Update</button>
          </NavLink>
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
