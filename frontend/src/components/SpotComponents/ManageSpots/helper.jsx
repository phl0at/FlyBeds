import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteSpot from "../../ModalComponents/DeleteSpotModal/DeleteSpot";
import { IoStar } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export const UserSpots = ({ spot }) => {
  return (
    <>
      <section>
        <NavLink to={`/spot/${spot.id}`} className="spot-list tooltip">
          <span className="tooltiptext">{spot.name}</span>
          <img src={spot.previewImage} />
          <div className="spot-info">
            <p>
              {spot.city}, {spot.state}
            </p>
            <p>
              <IoStar />
              {spot.avgRating ? spot.avgRating : "New"}
            </p>
            <p>{`$${spot.price} / night`}</p>
          </div>
        </NavLink>
        <div>
          <button>
            <NavLink to={`/spot/${spot.id}/update`}>Update</NavLink>
          </button>
        </div>
        <OpenModalMenuItem
          itemText="Delete"
          modalComponent={<DeleteSpot spotId={spot.id} />}
        />
      </section>
    </>
  );
};
