import { getAllSpotsThunk, getSpotArray } from "../../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { useEffect } from "react";
import "./AllSpots.css";

const AllSpots = () => {
  const dispatch = useDispatch();

  const spotData = useSelector(getSpotArray);
  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  return (
    <>
      <main className="spots-grid">
        {spotData.map(
          ({ id, name, city, state, price, previewImage, avgRating }) => {
            if (avgRating) {
              avgRating = avgRating.toString();
              if (avgRating.split(".").length < 2) {
                avgRating += ".0";
              }
            }

            return (
              <NavLink to={`/spot/${id}`} key={id} className="spot-card">
                <div className="spot-image">
                  <img title={name} src={previewImage} />
                </div>
                <div className="info-container">
                  <div className="spot-info-left">
                    <div>
                      {city}, {state}{" "}
                    </div>
                    <div>{`$${price} / night`}</div>
                  </div>
                  <div className="spot-info-right">
                    <div>
                      <IoStar className="blue" />{" "}
                      {avgRating ? avgRating : "New"}
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          }
        )}
      </main>
    </>
  );
};

export default AllSpots;
