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


  if (!reviewData.length) return <h2>Loading...</h2>;

  return (
    <>
      <header>
        {numReviews === 0 && currUser.id !== currSpot.ownerId
          ? "Be the first to post a review!"
          : null}
        {numReviews === 0 ? (
          <h3>
            <IoStar /> {avgRating ? avgRating : "New"}
          </h3>
        ) : (
          <h3>
            <IoStar /> {avgRating ? avgRating : "New"} •{" "}
            {numReviews === 1
              ? `${numReviews} Review`
              : `${numReviews} Reviews`}
          </h3>
        )}
      </header>
      {reviewData.map(({ User, review, id, createdAt }) => {
        const date = new Date(createdAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
        });

        return (
          <>
            <section key={id}>
              <p>{User.firstName}</p>
              <p>{date}</p>
              <p>{review}</p>
            </section>
          </>
        );
      })}
    </>
  );
};

export default SpotReviews;
