import CreateReview from "../../components/ModalComponents/CreateReviewModal/CreateReview";
import OpenModalMenuItem from "../../components/Navigation/OpenModalMenuItem";
import { IoStar } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export const textInput = (value, placeholder, setter, spot) => {
  return (
    <input
      type="text"
      value={value ? value : spot[placeholder.toLowerCase()]}
      name={placeholder}
      placeholder={placeholder}
      onChange={(e) => {
        setter(e.target.value);
      }}
    />
  );
};

export const noReviews = (currUser, currSpot) => {
  if (currUser) {
    currUser.id === currSpot.ownerId
      ? "Nobody has reviewed your spot yet!"
      : "Be the first to post a review!";
  } else {
    return "Sign in to review this spot!";
  }
};

export const postReviewButton = (spotId, ownerId, userId, reviews) => {
  if (ownerId === userId) return null;

  for (const review of reviews) {
    if (userId === review.userId) return null;
  }

  return (
    <OpenModalMenuItem
      itemText="Post Your Review"
      modalComponent={<CreateReview spotId={spotId} />}
    />
  );
};

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
          <OpenModalMenuItem
            itemText="Delete"
            //   modalComponent={<DeleteSpot spotId={spot.id}/>}
          />
        </div>
      </section>
    </>
  );
};
