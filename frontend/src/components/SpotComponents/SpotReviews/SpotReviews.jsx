import { getAllReviewsThunk } from "../../../store/reviews";
import { sortReviews } from "../../../utils/JS/helper";
import { noReviews, postReviewButton } from "./helper";
import { useDispatch, useSelector } from "react-redux";
import { IoStar } from "react-icons/io5";
import { useEffect } from "react";
import "./SpotReviews.css";

const SpotReviewInfo = ({ firstName, date, review }) => (
  <>
    <section>
      <p>{firstName}</p>
      <p>{date}</p>
      <p>{review}</p>
    </section>
  </>
);

const SpotReviews = ({ reviewData, spotId, avgRating, numReviews }) => {
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
          <IoStar /> {typeof avgRating === Number ? avgRating : "New"} •{" "}
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

      {sortByCreatedAt?.map(
        ({ User: { firstName }, review, id, createdAt }) => {
          const date = new Date(createdAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
          });

          return (
            <SpotReviewInfo
              key={id}
              review={review}
              date={date}
              firstName={firstName}
            />
          );
        }
      )}
    </>
  );
};

export default SpotReviews;
