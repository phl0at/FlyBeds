import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

//! --------------------------------------------------------------------
//*                          Action Types
//! --------------------------------------------------------------------

const GET_ALL_SPOTS = "spot/getAll";
const GET_ONE_SPOT = "spot/getOne";
const CREATE_SPOT = "spot/create";

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

const createSpot = (payload) => {
  return {
    type: CREATE_SPOT,
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

export const createSpotThunk = (spot, imageArr) => async (dispatch) => {
  try {
    const spotRes = await csrfFetch("/api/spots", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spot),
    });

    if (spotRes.ok) {
      const spotData = await spotRes.json();
      const imgRes = await csrfFetch(`/api/spots/${spotData.id}/images`, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageArr),
      });

      if (imgRes.ok) {
        const imgData = await imgRes.json();
        spotData.previewImage = imgData[0].url;
        dispatch(createSpot(spotData));
        return spotData;
      } else {
        const err = await imgRes.json();
        return err;
      }
    } else {
      const err = await spotRes.json();
      return err;
    }
  } catch (e) {
    return e;
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
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    case CREATE_SPOT: {
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;
