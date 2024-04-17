import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </label>
        {errors.email && <p className="errors">{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </label>
        {errors.username && <p className="errors">{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            placeholder="Fist Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />
        </label>
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />
        </label>
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </label>
        {errors.password && <p className="errors">{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="errors">{errors.confirmPassword}</p>
        )}
        <button
          className={disabled ? "grey" : null}
          disabled={disabled}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
