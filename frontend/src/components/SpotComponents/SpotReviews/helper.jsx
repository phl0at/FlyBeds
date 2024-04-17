import CreateReview from "../../ModalComponents/CreateReviewModal";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";

export const noReviews = (currUser, currSpot) => {
  if (currUser) {
    currUser.id === currSpot.ownerId ? (
      <h3>{"Nobody has reviewed your spot yet!"}</h3>
    ) : (
      <h3>{"Be the first to post a review!"}</h3>
    );
  } else {
    return <h3>{"Sign in to review this spot!"}</h3>;
  }
};

export const postReviewButton = (spotId, ownerId, userId, reviews) => {
  if (ownerId === userId) return <></>;

  for (const review of reviews) {
    if (userId === review.userId) return <></>;
  }

  return (
    <OpenModalMenuItem
      itemText="Post Your Review"
      modalComponent={<CreateReview spotId={spotId} />}
    />
  );
};


