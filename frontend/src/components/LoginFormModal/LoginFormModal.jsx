import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from "react";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const disabled = credential.length < 4 || password.length < 6;


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <div className="menu">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              placeholder="Username or Email"
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.credential && (
            <div className="errors">{errors.credential}</div>
          )}
          <button
            className={disabled ? "grey" : null}
            disabled={disabled}
            type="submit"
          >
            Log In
          </button>
        </form>
        <button
          onClick={() => {
            const credential = "Demo1";
            const password = "password1";

            return dispatch(sessionActions.login({ credential, password }))
              .then(closeModal)
              .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                  setErrors(data.errors);
                }
              });
          }}
        >
          Demo User
        </button>
      </div>
    </>
  );
}

export default LoginFormModal;
