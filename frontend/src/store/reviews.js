import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

//! --------------------------------------------------------------------
//*                          Action Types
//! --------------------------------------------------------------------

const GET_ALL_REVIEWS = "review/getAll";
// const GET_ONE_REVIEW = "review/getOne";

//! --------------------------------------------------------------------
//*                         Action Creator
//! --------------------------------------------------------------------

const getAllReviews = (payload) => {
  return {
    type: GET_ALL_REVIEWS,
    payload,
  };
};

// const getOneReview = (payload) => {
//   return {
//     type: GET_ONE_REVIEW,
//     payload,
//   };
// };

//! --------------------------------------------------------------------
//*                       Thunk Action Creator
//! --------------------------------------------------------------------

export const getAllReviewsThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviewData = await res.json();
    dispatch(getAllReviews(reviewData));
    return reviewData;
  } else {
    const err = await res.json();
    return err;
  }
};

// export const getOneReviewThunk = (spotId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

//   if (res.ok) {
//     const reviewData = await res.json();
//     dispatch(getOneReview(reviewData));
//     return reviewData;
//   } else {
//     const err = await res.json();
//     return err;
//   }
// };

//! --------------------------------------------------------------------
//*                            Selectors
//! --------------------------------------------------------------------

export const getReviewArray = createSelector(
  (state) => state.reviews,
  (review) => Object.values(review)
);

//! --------------------------------------------------------------------
//*                            Reducer
//! --------------------------------------------------------------------

const initialState = {};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS: {
      const newState = {};
      action.payload.Reviews.forEach(
        (review) => (newState[review.id] = review)
      );
      return newState;
    }
    // case GET_ONE_REVIEW: {
    //   const newState = {...state, [action.payload.id]: action.payload}
    //   return newState;
    // }
    default:
      return state;
  }
};

export default reviewReducer;
