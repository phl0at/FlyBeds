import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";

//! --------------------------------------------------------------------
//*                          Action Types
//! --------------------------------------------------------------------
const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_ONE_SPOT = "spot/getOneSpot";
// const CREATE_SPOT = "spot/createSpot";

//! --------------------------------------------------------------------
//*                         Action Creator
//! --------------------------------------------------------------------

const getAllSpots = (payload) => {
  return {
    type: GET_ALL_SPOTS,
    payload,
  };
};

const getOneSpot = (payload) => {
  return {
    type: GET_ONE_SPOT,
    payload,
  };
};

//! --------------------------------------------------------------------
//*                       Thunk Action Creator
//! --------------------------------------------------------------------

export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  if (res.ok) {
    const spotData = await res.json();
    dispatch(getAllSpots(spotData));
    return spotData;
  } else {
    const err = await res.json();
    return err;
  }
};

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const spotData = await res.json();
    dispatch(getOneSpot(spotData));
    return spotData;
  } else {
    const err = await res.json();
    return err;
  }
};

//! --------------------------------------------------------------------
//*                            Selectors
//! --------------------------------------------------------------------

export const getSpotArray = createSelector(
  (state) => state.spots,
  (spots) => Object.values(spots)
);

//! --------------------------------------------------------------------
//*                            Reducer
//! --------------------------------------------------------------------

const initialState = {};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const newState = {};
      action.payload.Spots.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    }
    case GET_ONE_SPOT: {
      const newState = {...state, [action.payload.id]: action.payload}
      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;
