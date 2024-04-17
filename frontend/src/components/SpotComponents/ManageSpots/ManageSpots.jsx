import { getOwnedSpotsThunk, getSpotArray } from "../../../store/spots";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IoStar } from "react-icons/io5";
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
      <section>
        {spotData.map(
          ({ id, name, city, state, price, previewImage, avgRating }, i) => {
            if (avgRating) {
              avgRating = avgRating.toString();
              if (avgRating.split(".").length < 2) {
                avgRating += ".0";
              }
            }

            return (
              <>
                <section key={i}>
                  <NavLink
                    to={`/spot/${id}`}
                    key={id}
                    className="spot-list tooltip"
                  >
                    <span className="tooltiptext">{name}</span>
                    <img src={previewImage} />
                    <div className="spot-info">
                      <p>
                        {city}, {state}
                      </p>
                      <p>
                        <IoStar />
                        {avgRating ? avgRating : "New"}
                      </p>
                      <p>{`$${price} / night`}</p>
                    </div>
                  </NavLink>
                  <div>
                    <OpenModalMenuItem
                      itemText="Update"
                      onItemClick={""}
                      modalComponent={""}
                    />
                    <OpenModalMenuItem
                      itemText="Delete"
                      onItemClick={""}
                      modalComponent={""}
                    />
                  </div>
                </section>
              </>
            );
          }
        )}
      </section>
    </>
  );
};

export default ManageSpots;
