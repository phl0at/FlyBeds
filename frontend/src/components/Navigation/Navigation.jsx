import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import homeLogo from "../../../../images/Home_Logo.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <>

        <NavLink to="/">
          {<img className="home-logo" width="70px" src={homeLogo} />}
        </NavLink>


      <div className="profile-button">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
      <div className="create-button">
        {sessionUser && (
          <button >
            <NavLink className="create-spot" to="/spot/new">Create a Spot</NavLink>
          </button>
        )}
      </div>
    </>
  );
}

export default Navigation;
