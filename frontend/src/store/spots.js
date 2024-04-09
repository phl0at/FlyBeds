import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";

//! --------------------------------------------------------------------
//*                          Action Types
//! --------------------------------------------------------------------
const GET_ALL_SPOTS = "spot/getAllSpots";
// const POST_SPOT = "spot/postSpot";

//! --------------------------------------------------------------------
//*                         Action Creator
//! --------------------------------------------------------------------

const getAllSpots = (payload) => {
  return {
    type: GET_ALL_SPOTS,
    payload
  };
};

//! --------------------------------------------------------------------
//*                       Thunk Action Creator
//! --------------------------------------------------------------------

export const getAllSpotsThunk = () => async (dispatch) => {

  const res = await csrfFetch("/api/spots");

  if (res.ok) {
    const spotData = await res.json();
    console.log('SPOT DATA', spotData)
    dispatch(getAllSpots(spotData));
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
      action.payload.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;
