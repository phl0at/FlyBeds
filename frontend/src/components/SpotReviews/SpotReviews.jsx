import "./SpotReviews.css";
import { IoStar } from "react-icons/io5";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsThunk, getReviewArray } from "../../store/reviews";

const SpotReviews = ({ spotId, avgRating, numReviews }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReviewsThunk(spotId));
  }, [dispatch, spotId]);

  const reviewData = useSelector(getReviewArray);
  if (!reviewData.length) return <h2>Loading...</h2>;

  return (
    <section>
      <div>
        <IoStar /> {avgRating} *{" "}
        {numReviews === 1 ? `${numReviews} review` : `${numReviews} reviews`}
      </div>
      {reviewData.map(({ User, review, id, updatedAt }) => {
        const date = new Date(updatedAt).toLocaleDateString("en-us", {
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
    </section>
  );
};

export default SpotReviews;
