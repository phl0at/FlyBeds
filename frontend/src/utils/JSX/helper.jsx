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

export const postReviewButton = (ownerId, userId, reviews) => {
  if (ownerId === userId) return null;
  let reviewed = false;
  // const onClick = () => {

  // }

  for (const review of reviews) {
    if (userId === review.userId) reviewed = true;
  }

  if (reviewed) {
    return null;
  } else {
    return <button className="review-button">Post a review</button>;
  }
};
