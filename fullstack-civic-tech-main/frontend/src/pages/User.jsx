import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import { deleteUser } from "../adapters/user-adapter"
import UpdateUsernameForm from "../components/UpdateUsernameForm";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.message);
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  const deleteAccount = async (userId) => {
    deleteUser(userId);
    setCurrentUser(null);
    navigate('/');
  }

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

  return (
    <div className="container is-flex is-justify-content-center" style={{width: "100vw"}}>
      <div className="box">
        <h1 className="title has-text-centered">{profileUsername}</h1>
        {isCurrentUserProfile && (
          <div className="buttons is-centered">
            <button
              className="button is-danger"
              onClick={handleLogout}
            >
              Log Out
            </button>
            <button
              className="button is-danger"
              onClick={deleteAccount}
            >
              Delete Account
            </button>
          </div>
        )}
        <p className="has-text-centered">Fake Bio or something</p>
        {isCurrentUserProfile && (
          <UpdateUsernameForm
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
      </div>
    </div>)
    {/* <h1>{profileUsername}</h1>
    { !!isCurrentUserProfile && <button onClick={handleLogout}>Log Out</button> }
    { !!isCurrentUserProfile && <button onClick={deleteAccount}>Delete Account</button> }
    <p>Fake Bio or something</p>
    {
      !!isCurrentUserProfile
        && <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser}/>
    } */}
}