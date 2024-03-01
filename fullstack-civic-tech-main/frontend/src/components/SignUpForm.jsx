import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import { base } from '@uploadcare/upload-client';
import '../pages/Landing.css';
import './signUpForm.css';

export default function SignUpForm() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  // eslint-disable-next-line max-len
  // const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '', name: '', profile_pic: '', artist_type: '' });
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [typeOfArtist, setTypeOfArtist] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profile_pic, setProfilePhoto] = useState(null);

  if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setErrorText('');
    if (!username || !password) return setErrorText('Missing username or password');
    if (password !== confirmPassword) return setErrorText('Passwords do not match');
  
    let profile_pic_url = "../../public/img/default-profile-picture.png"
  
    if (profile_pic) {
      const { file } = await base(profile_pic, {
        publicKey: '5fe7348726376d2e9e7d',
        store: 'auto',
      });
      profile_pic_url = `https://ucarecdn.com/${file}/`;
    } 
    console.log(profile_pic_url)
  
    const [user, error] = await createUser({ username, password, name, typeOfArtist, profile_pic: profile_pic_url });
    console.log(user);
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    // eslint-disable-next-line no-shadow
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'name') setName(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    if (name === 'typeOfArtist') setTypeOfArtist(value);
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
  };

  return (
    <>
      <form className="signUpFormContainer" onSubmit={handleSubmit} aria-labelledby="create-heading">
        <label htmlFor="username" className="signUpFormLabel">Username</label>
        <input className="signUpFormInput"
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />

        <label htmlFor="name" className="signUpFormLabel">Name</label>
        <input className="signUpFormInput"
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={name}
        />

        <label htmlFor="typeOfArtist" className="signUpFormLabel">Type of Artist</label>
        <div className="signUpSelect">
        <select id="typeOfArtist" name="typeOfArtist" onChange={handleChange} value={typeOfArtist}>
          <option value="">Select...</option>
          <option value="Listener">Listener</option>
          <option value="Singer">Singer</option>
          <option value="Songwriter">Songwriter</option>
          <option value="Rapper">Rapper</option>
          <option value="Producer">Producer</option>
          <option value="Audio Engineer">Audio Engineer</option>
          <option value="DJ">DJ</option>
          <option value="Promoter">Promoter</option>
          <option value="Other">Other</option>
        </select>
        </div>

        <label htmlFor="password" className="signUpFormLabel">Password</label>
        <input className="signUpFormInput"
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <label htmlFor="confirmPassword" className="signUpFormLabel">Confirm Password</label>
        <input className="signUpFormInput"
          autoComplete="off"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />

        <label htmlFor="profilePhoto" className="signUpFormLabel">Profile Photo</label>
        <input className="signUpFormInput"
          type="file"
          id="profilePhoto"
          name="profilePhoto"
          accept="image/*"
          onChange={handleProfilePhotoChange}
        />

        <button className="signUpFormButton" type="submit" >Register</button>
        {errorText && <p className='alreadyTaken'>{errorText}</p>}
        <p className="signUpFormSwapLabel">Have an account with us? </p>
      </form>
    </>
  );
}
