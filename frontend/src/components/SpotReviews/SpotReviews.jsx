import "./SpotReviews.css";
import { IoStar } from "react-icons/io5";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsThunk, getReviewArray } from "../../store/reviews";

const SpotReviews = ({ spotId, avgRating, numReviews }) => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const currSpot = useSelector((state) => state.spots[spotId]);
  const reviewData = useSelector(getReviewArray);

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
      
      <div className="no-reviews">
        {numReviews === 0 && currUser && currUser.id === currSpot.ownerId
          ? "Nobody has reviewed your spot yet!"
          : "Be the first to post a review!"}
      </div>

      {reviewData.map(({ User, review, id, createdAt }) => {

        const date = new Date(createdAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
        });

        return (
          <>
            <section key={id}>
              <p key={User}>{User.firstName}</p>
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
