import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import homeLogo from "../../../../images/Home_Logo.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigateTo = useNavigate();
  return (
    <>
      <main className="nav-bar">
        <NavLink to="/">
          {<img className="home-logo" width="70px" src={homeLogo} />}
        </NavLink>

        <div className="button-container">
          {sessionUser && (
            <NavLink className="create-spot" to="/spot/new">
              <button
                onClick={() => {
                  navigateTo("/spot/new");
                }}
                className="create-button"
              >
                Create a Spot
              </button>
            </NavLink>
          )}
        </div>
        <div className="profile-button">
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      </main>
    </>
  );
}

export default Navigation;
