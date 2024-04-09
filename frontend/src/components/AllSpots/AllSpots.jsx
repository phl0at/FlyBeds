import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk, getSpotArray } from "../../store/spots";

const AllSpots = () => {

  const dispatch = useDispatch();

  const spotData = useSelector(state => state.spots);
  console.log('SPOTDATA', spotData)

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  return (
    <>
      <h1>All Spots will go here</h1>
    </>
  );
};

export default AllSpots;
