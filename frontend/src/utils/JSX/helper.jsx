import CreateReview from "../../components/ReviewComponents/CreateReview/CreateReview";
import OpenModalMenuItem from "../../components/Navigation/OpenModalMenuItem";

export const textInput = (value, placeholder, setter) => {
  return (
    <input
      type="text"
      value={value}
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
