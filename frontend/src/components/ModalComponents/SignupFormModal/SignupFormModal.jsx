import * as sessionActions from "../../../store/session";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const disabled =
    !email.length ||
    !username.length ||
    !firstName.length ||
    !lastName.length ||
    password.length < 6 ||
    confirmPassword.length < 6;

  useEffect(() => {
    setErrors({});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
      <div className="signup-menu">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="header">
            <h1>Sign Up</h1>
          </div>

          {errors.email && <p className="errors">{errors.email}</p>}

          {errors.username && <p className="errors">{errors.username}</p>}

          {errors.firstName && <p className="errors">{errors.firstName}</p>}

          {errors.lastName && <p className="errors">{errors.lastName}</p>}

          {errors.password && <p className="errors">{errors.password}</p>}

          {errors.confirmPassword && (
            <p className="errors">{errors.confirmPassword}</p>
          )}

          <input
            className="email-input input"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <input
            className="username-input input"
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />

          <input
            className="firstname-input input"
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />

          <input
            className="lastname-input input"
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />

          <input
            className="password-input input"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />

          <input
            className="passwrd-input input"
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />

          <button
            className={disabled ? "grey" : null}
            disabled={disabled}
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
