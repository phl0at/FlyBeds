import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

//! --------------------------------------------------------------------
//*                          Action Types
//! --------------------------------------------------------------------

const CLEAR_SPOTS = "spot/remove";
const GET_ALL_SPOTS = "spot/getAll";
const GET_OWNED_SPOTS = "spot/getOwned";
const GET_ONE_SPOT = "spot/getOne";
const CREATE_SPOT = "spot/create";
const UPDATE_SPOT = "spot/update";
const ADD_IMAGES = "spot/addImages";

//! --------------------------------------------------------------------
//*                         Action Creator
//! --------------------------------------------------------------------

export const clearSpots = (payload) => {
  return {
    type: CLEAR_SPOTS,
    payload,
  };
};

const getAllSpots = (payload) => {
  return {
    type: GET_ALL_SPOTS,
    payload,
  };
};

const getOwnedSpots = (payload) => {
  return {
    type: GET_OWNED_SPOTS,
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

const updateSpot = (payload) => {
  return {
    type: UPDATE_SPOT,
    payload,
  };
};

const addImages = (payload, id) => {
  return {
    type: ADD_IMAGES,
    payload,
    id,
  };
};

//! --------------------------------------------------------------------
//*                       Thunk Action Creator
//! --------------------------------------------------------------------

export const getAllSpotsThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/spots");

    if (res.ok) {
      const spotData = await res.json();
      dispatch(getAllSpots(spotData));
      return spotData;
    }
  } catch (e) {
    const err = await e.json();
    return err;
  }
};

//! --------------------------------------------------------------------

export const getOwnedSpotsThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/spots/current");

    if (res.ok) {
      const spotData = await res.json();
      dispatch(getOwnedSpots(spotData));
      return spotData;
    }
  } catch (e) {
    const err = await e.json();
    return err;
  }
};

//! --------------------------------------------------------------------

export const getOneSpotThunk = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    if (res.ok) {
      const spotData = await res.json();
      dispatch(getOneSpot(spotData));
      return spotData;
    }
  } catch (e) {
    const err = await e.json();
    return err;
  }
};

//! --------------------------------------------------------------------

export const createSpotThunk = (spot, imageArr, user) => async (dispatch) => {
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
      spotData.previewImage = imageArr[0].url;
      spotData.Owner = user;
      dispatch(createSpot(spotData));
      return spotData;
    }
  } catch (e) {
    const err = await e.json();
    return err;
  }
};

//! --------------------------------------------------------------------

export const updateSpotThunk = (spot, imageArr) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "PUT",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spot),
    });

    if (res.ok) {
      const spotData = await res.json();
      spotData.previewImage = imageArr[0].url;
      dispatch(updateSpot(spotData));
      return spotData;
    }
  } catch (e) {
    console.log(e);
    const err = await e.json();
    return err;
  }
};

//! --------------------------------------------------------------------

export const addImagesThunk = (spotData, imageArr) => async (dispatch) => {
  try {
    const imgRes = await csrfFetch(`/api/spots/${spotData.id}/images`, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageArr),
    });

    if (imgRes.ok) {
      const newImages = await imgRes.json();
      dispatch(addImages(newImages, spotData.id));
      return spotData;
    }
  } catch (e) {
    const err = await e.json();
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
    case CLEAR_SPOTS: {
      return {};
    }
    case GET_ALL_SPOTS: {
      const newState = {};
      action.payload.Spots.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    }
    case GET_OWNED_SPOTS: {
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
    case UPDATE_SPOT: {
      const newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    case ADD_IMAGES: {
      const newState = {
        ...state,
        [action.id]: {
          ...state[action.id],
          SpotImages: [...action.payload],
        },
      };
      return newState;
    }
    default:
      return state;
  }
};

export default spotReducer;
