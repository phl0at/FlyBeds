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
      <>
        <main>
          <div className="header-container">
            <h1 className="manage-spot-header">Manage Spots</h1>
          </div>
          <div className="empty-spots">
            <NavLink to="/spot/new">
              <button className="create-spot-button shadow">
                Create a New Spot
              </button>
            </NavLink>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="header-container">
        <h1 className="manage-spot-header">Manage Spots</h1>
      </div>
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
