import { getAllReviewsThunk, getReviewArray } from "../../store/reviews";
import { sortReviews } from "../../utils/JS/helper";
import { noReviews, postReviewButton } from "../../utils/JSX/helper";
import { useDispatch, useSelector } from "react-redux";
import { IoStar } from "react-icons/io5";
import { useEffect } from "react";
import "./SpotReviews.css";

const SpotReviews = ({ spotId, avgRating, numReviews }) => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const currSpot = useSelector((state) => state.spots[spotId]);
  const reviewData = useSelector(getReviewArray);
  const sortByCreatedAt = sortReviews(reviewData);

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  return (
    <>
      <header>
        <h3>
          <IoStar /> {avgRating ? avgRating : "New"} •{" "}
          {numReviews === 1 ? `${numReviews} Review` : `${numReviews} Reviews`}
        </h3>
      </header>
      <div className="post-review">
        {currUser
          ? postReviewButton(currSpot.Owner.id, currUser.id, reviewData)
          : null}
      </div>

      <div className="no-reviews">
        {numReviews === 0 ? noReviews(currSpot) : null}
      </div>

      {sortByCreatedAt.map(({ User: { firstName }, review, id, createdAt }) => {
        const date = new Date(createdAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
        });

        return (
          <>
            <section key={id}>
              <p key={firstName}>{firstName}</p>
              <p key={date}>{date}</p>
              <p key={review}>{review}</p>
            </section>
          </>
        );
      })}
    </>
  );
};

export default SpotReviews;
