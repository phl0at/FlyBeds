import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import SignupFormModal from "../ModalComponents/SignupFormModal";
import LoginFormModal from "../ModalComponents/LoginFormModal";
import { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigateTo = useNavigate()
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
    navigateTo("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="shadow" onClick={toggleMenu}>
        <HiMenu />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p>Hello, {user.firstName}</p>
            <p>{user.email}</p>
            <p>
              <button>
                <NavLink className="manage-spot" to={`/spot/user/${user.id}`}>Manage Spots</NavLink>
              </button>
            </p>
            <p>
              <button onClick={logout}>Log Out</button>
            </p>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
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
