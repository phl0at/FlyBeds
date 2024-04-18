import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

//! --------------------------------------------------------------------
//*                          Action Types
//! --------------------------------------------------------------------

const GET_ALL_REVIEWS = "review/getAll";
const GET_ONE_REVIEW = "review/getOne";
const CREATE_REVIEW = "review/create";
const DELETE_REVIEW = "review/delete";

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

const deleteReview = (payload) => {
  return {
    type: DELETE_REVIEW,
    payload,
  };
};

//! --------------------------------------------------------------------
//*                       Thunk Action Creator
//! --------------------------------------------------------------------

export const getAllReviewsThunk = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
      const reviewData = await res.json();
      dispatch(getAllReviews(reviewData));
      return reviewData;
    }
  } catch (e) {
    const err = await e.json();
    return err ? err : e;
  }
};

//! --------------------------------------------------------------------

export const getOneReviewThunk = (userId, spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
      const reviewData = await res.json();
      for (const review of reviewData.Reviews) {
        if (userId === review.userId) dispatch(getOneReview(review));
        return review;
      }
    }
  } catch (e) {
    const err = await e.json();
    return err ? err : e;
  }
};

//! --------------------------------------------------------------------

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
        return reviewData;
      }
    } catch (e) {
      const err = await e.json();
      return err ? err : e;
    }
  };

//! --------------------------------------------------------------------

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      dispatch(deleteReview(reviewId));
    }
  } catch (e) {
    const err = await e.json();
    return err ? err : e;
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
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewReducer;
