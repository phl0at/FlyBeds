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
        <h6 className="text">{review}</h6>
        <div>
          {currUser && userId === currUser.id && (
            <>
              <OpenModalMenuItem
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

      <div className="no-reviews">
        {numReviews === 0 ? noReviews(currUser, currSpot) : null}
      </div>

      {sortByCreatedAt?.map((review) => {
        const user = review.User;
        const date = new Date(review.createdAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
        });

        return (
          <SpotReviewInfo
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
