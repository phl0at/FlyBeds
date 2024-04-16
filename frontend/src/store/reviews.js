import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

//! --------------------------------------------------------------------
//*                          Action Types
//! --------------------------------------------------------------------

const GET_ALL_REVIEWS = "review/getAll";
const GET_ONE_REVIEW = "review/getOne";
const CREATE_REVIEW = "review/create";

//! --------------------------------------------------------------------
//*                           Action Creator
//! --------------------------------------------------------------------

const getAllReviews = (payload) => {
  return {
    type: GET_ALL_REVIEWS,
    payload,
  };
};

const getOneReview = (payload) => {
  return {
    type: GET_ONE_REVIEW,
    payload,
  };
};

const createReview = (payload) => {
  return {
    type: CREATE_REVIEW,
    payload,
  };
};

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

export const getOneReviewThunk = (userId, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviewData = await res.json();
    for (const review of reviewData.Reviews) {
      if (userId === review.userId) dispatch(getOneReview(review));
      return review;
    }
  } else {
    const err = await res.json();
    return err;
  }
};

export const createReviewThunk =
  (review, stars, spotId, currUser) => async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review, stars }),
      });

      if (res.ok) {
        const reviewData = await res.json();
        reviewData.User = currUser;
        dispatch(createReview(reviewData));
        return reviewData
      } else {
        const err = await res.json();
        return err;
      }
    } catch (e) {
      return e;
    }
  };

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

    case GET_ONE_REVIEW: {
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }

    case CREATE_REVIEW: {
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;
