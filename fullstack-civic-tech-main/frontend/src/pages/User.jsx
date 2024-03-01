import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import { deleteUser } from "../adapters/user-adapter"
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import "./UsersPage.css";
import './user.css';

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
  const profileArtistType = isCurrentUserProfile ? currentUser.artist_type : userProfile.artist_type;
  const profileName = isCurrentUserProfile ? currentUser.name : userProfile.name;
  const profilePic = isCurrentUserProfile ? currentUser.profile_pic : userProfile.profile_pic;

  return (
    <div className="" style={{width: "100vw"}}>
      <div className="userProfileCard">
        <figure className="">
                <img className="userProfilePicture" src={profilePic} 
          alt="Profile Picture"/>
        </figure>
        <h1 className="userProfileName">{profileName}</h1>
        <h2 className="userProfileUsername">@{profileUsername}</h2>
        <h2 className="userProfileArtistType">{profileArtistType}</h2>
        <br />
        {isCurrentUserProfile && (
          <div className="userProfileButtonContainers">
            <button
              className="userProfileButton userLogoutButton"
              onClick={handleLogout}
            >
              Log Out
            </button>
            <button
              className="userProfileButton userDeleteAccountButton"
              onClick={deleteAccount}
            >
              Delete Account
            </button>
          </div>
        )}
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