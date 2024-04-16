import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <>
      <div className="home-button">
        <button>
          <NavLink to="/">Home</NavLink>
        </button>
      </div>
      <div className="profile-button">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
      <div className="create-button">
        {sessionUser && (
          <button>
            <NavLink to="/spot/new">Create a Spot</NavLink>
          </button>
        )}
      </div>
    </>
  );
}

export default Navigation;
