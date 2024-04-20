import { getOwnedSpotsThunk, getSpotArray } from "../../../store/spots";
import { UserSpots } from "./helper";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./ManageSpots.css";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const spotData = useSelector(getSpotArray);
  const currUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getOwnedSpotsThunk());
  }, [dispatch, currUser]);

  if (!currUser) navigateTo("/");

  if (!spotData.length) {
    return (
      <button>
        <NavLink to="/spot/new">Create a New Spot</NavLink>
      </button>
    );
  }

  return (
    <>
      <h1>Manage Spots</h1>
      <main className="manage-spots-grid">
        {spotData.map((spot) => {
          if (spot.avgRating) {
            spot.avgRating = spot.avgRating.toString();
            if (spot.avgRating.split(".").length < 2) {
              spot.avgRating += ".0";
            }
          }

          return (
            <>
              <UserSpots key={spot.id} spot={spot} />
            </>
          );
        })}
      </main>
    </>
  );
};

export default ManageSpots;
