import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk, getSpotArray } from "../../store/spots";
import { NavLink } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import "./AllSpots.css";

const AllSpots = () => {
  const dispatch = useDispatch();

  const spotData = useSelector(getSpotArray);
  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  return (
    <>
      <section>
        {spotData.map(
          ({ id, name, city, state, price, previewImage, avgRating }) => (
            <NavLink to={`/spot/${id}`} key={id} className="spot-list tooltip">
              <span className="tooltiptext">{name}</span>
              <img src={previewImage} />
              <div className="spot-info">
                <p>
                  {city} {state}
                </p>
                <p>
                  <IoStar />
                  {avgRating? avgRating : "New"}
                </p>
                <p>{`${price} night`}</p>
              </div>
            </NavLink>
          )
        )}
      </section>
    </>
  );
};

export default AllSpots;
