import CreateReview from "../../ModalComponents/CreateReviewModal";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";

export const noReviews = (currUser, currSpot) => {
  if (currUser?.id === currSpot.ownerId) {
    return <h3 className="no-review-text">{"Nobody has reviewed your spot yet!"}</h3>;
  } else {
    return <h3 className="no-review-text">{"Be the first to post a review!"}</h3>;
  }
};

export const postReviewButton = (spotId, ownerId, userId, reviews) => {
  if (ownerId === userId) return <></>;

  for (const review of reviews) {
    if (userId === review.userId) return <></>;
  }

  return (
    <OpenModalMenuItem
      className="post"
      itemText="Post Your Review"
      modalComponent={<CreateReview spotId={spotId} />}
    />
  );
};
