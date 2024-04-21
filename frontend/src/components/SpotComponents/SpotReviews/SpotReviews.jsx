import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import DeleteReview from "../../ModalComponents/DeleteReviewModal";
import { getAllReviewsThunk } from "../../../store/reviews";
import { sortReviews } from "../../../utils/JS/helper";
import { noReviews, postReviewButton } from "./helper";
import { useDispatch, useSelector } from "react-redux";
import { IoStar } from "react-icons/io5";
import { useEffect } from "react";
import "./SpotReviews.css";

const SpotReviewInfo = ({
  stars,
  currUser,
  reviewId,
  userId,
  firstName,
  date,
  review,
}) => {
  return (
    <>
      <section className="review">
        <h3 className="first-name">{firstName}</h3>
        <h5 className="date">{date}</h5>
        <h5 className="num-reviews">
          {" "}
          <IoStar className="blue" />
          {` ${stars}`}
        </h5>
        <h4 className="text">{review}</h4>
        <div>
          {currUser && userId === currUser.id && (
            <>
              <OpenModalMenuItem
                className="delete-review-button"
                itemText="Delete"
                modalComponent={<DeleteReview reviewId={reviewId} />}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

const SpotReviews = ({ reviewData, spotId, avgRating, numReviews, notNum }) => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const currSpot = useSelector((state) => state.spots[spotId]);
  const sortByCreatedAt = sortReviews(reviewData);

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  return (
    <>
      <header>
        <h3>
          <IoStar className="blue" /> {notNum ? "New" : avgRating} •{" "}
          {numReviews === 1 ? `${numReviews} Review` : `${numReviews} Reviews`}
        </h3>
      </header>
      <div className="post-review">
        {currUser
          ? postReviewButton(spotId, currSpot.Owner.id, currUser.id, reviewData)
          : null}
      </div>

      {numReviews === 0 ? (
        <div className="no-reviews">{noReviews(currUser, currSpot)}</div>
      ) : null}

      {sortByCreatedAt?.map((review) => {
        const user = review.User;
        const date = new Date(review.createdAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
        });

        return (
          <SpotReviewInfo
            stars={review.stars}
            reviewId={review.id}
            key={review.id}
            review={review.review}
            date={date}
            firstName={user.firstName}
            userId={user.id}
            currUser={currUser}
          />
        );
      })}
    </>
  );
};

export default SpotReviews;
