import * as sessionActions from "../../../store/session";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const disabled = credential.length < 4 || password.length < 6;

  useEffect(() => {
    setErrors({});
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();

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
        <div className="header">
          <h1>Log In</h1>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-error errors">{errors.credential}</div>

          <input
            className="credential input"
            type="text"
            value={credential}
            placeholder="Username or Email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            className="password input"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className={`login-modal shadow ${disabled ? "grey" : null}`}
            disabled={disabled}
            type="submit"
          >
            Log In
          </button>
        </form>
        <button
          className="demo-button shadow"
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
