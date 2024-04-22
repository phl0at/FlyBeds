import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import SignupFormModal from "../ModalComponents/SignupFormModal";
import LoginFormModal from "../ModalComponents/LoginFormModal";
import { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigateTo("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="shadow menu-button" onClick={toggleMenu}>
        <HiMenu className="menu-icon" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>
              <h3>Hello, {user.firstName}</h3>
              <h5 className="email">{user.email}</h5>
            </div>
            <div>
              <NavLink className="manage-spot" to={`/spot/user/${user.id}`}>
                <button
                  onClick={() => {
                    navigateTo(`/spot/user/${user.id}`);
                  }}
                  className="manage-button"
                >
                  Manage Spots
                </button>
              </NavLink>
            </div>
            <div>
              <button className="logout-button" onClick={logout}>
                Log Out
              </button>
            </div>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              className="login-button"
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              className="signup-button"
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
