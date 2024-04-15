import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div className="home-button">
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="profile-button">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
      <div className="create-button">
        {sessionUser && <NavLink to="/spot/new">Create a Spot</NavLink>}
      </div>
    </>
  );
}

export default Navigation;
