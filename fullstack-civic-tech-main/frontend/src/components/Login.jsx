import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";

export default function LoginForm() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    const formData = new FormData(event.target);
    const [user, error] = await logUserIn(Object.fromEntries(formData));
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  if (currentUser) return <Navigate to="/" />;

  return <>
    <div className="loginFormContainer">
    <form onSubmit={handleSubmit} aria-labelledby="login-heading">
      <label className="loginFormLabel" htmlFor="username">Username</label>
      <input className="loginFormInput" type="text" autoComplete="username" id="username" name="username" />

      <label className="loginFormLabel" htmlFor="password">Password</label>
      <input className="loginFormInput" type="password" autoComplete="current-password" id="password" name="password" />

      <button className="loginFormButton">Log in</button>
    </form>
    <p className="landingLoginQuestion">Don't have an account with us? </p>
    </div>
    { !!errorText && <p>{errorText}</p> }
  </>;
}
