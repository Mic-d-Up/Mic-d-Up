import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  // const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '', name: '', profile_pic: '', artist_type: '' });
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [artist_type, setTypeOfArtist] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profile_pic, setProfilePhoto] = useState(null);

  if (currentUser) return <Navigate to="/" />;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrorText('');
  //   // formData = new FormData(e.target);
  //   // const formInput = Object.fromEntries(formData);
  //   // const [user, error] = await createUser(formInput);
  //   // console.log(formInput, user);
  //   if (!username || !password) return setErrorText('Missing username or password');
  //   if (password !== confirmPassword) return setErrorText('Passwords do not match');

  //   // Perform additional validation if needed

  //   const [user, error] = await createUser({ username, password, name, artist_type, profile_pic });
  //   console.log(user);
  //   if (error) return setErrorText(error.message);
  //   setCurrentUser(user);
  //   navigate('/');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText('');
  
    // Extract form data using FormData
    const formData = new FormData(e.target);
    const formInput = Object.fromEntries(formData);
  
    // Extract individual form fields
    const { username, password, confirmPassword, name, artist_type, profile_pic } = formInput;
  
    // Check for missing fields or password mismatch
    if (!username || !password) return setErrorText('Missing username or password');
    if (password !== confirmPassword) return setErrorText('Passwords do not match');
  
    // Perform additional validation if needed
  
    // Call createUser function with form input
    const [user, error] = await createUser({ username, password, name, artist_type, profile_pic });
    
    // Log form input and user
    console.log(formInput, user);
  
    // Handle errors
    if (error) return setErrorText(error.message);
  
    // Set current user and navigate
    setCurrentUser(user);
    navigate('/');
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'name') setName(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    if (name === 'typeOfArtist') setTypeOfArtist(event.target.value);
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} aria-labelledby="create-heading">
        <h2 id="create-heading">Create New User</h2>
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={name}
        />

        <label htmlFor="typeOfArtist">Type of Artist</label>
        <select id="typeOfArtist" name="typeOfArtist" onChange={handleChange} value={artist_type}>
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
{/* 
<div className="dropdown is-active">
  <div className="dropdown-trigger">
    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Dropdown button</span>
      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div className="dropdown-menu" id="dropdown-menu" role="menu">
    <div className="dropdown-content">
      <a href="#" class="dropdown-item">
        Dropdown item
      </a>
      <a className="dropdown-item">
        Other dropdown item
      </a>
      <a href="#" class="dropdown-item is-active">
        Active dropdown item
      </a>
      <a href="#" class="dropdown-item">
        Other dropdown item
      </a>
      <hr className="dropdown-divider"/>
      <a href="#" class="dropdown-item">
        With a divider
      </a>
    </div>
  </div>
</div> */}

        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          autoComplete="off"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />

        <label htmlFor="profilePhoto">Profile Photo</label>
        <input
          type="file"
          id="profilePhoto"
          name="profilePhoto"
          accept="image/*"
          onChange={handleProfilePhotoChange}
        />

        <button type="submit">Sign Up Now!</button>
      </form>
      {errorText && <p>{errorText}</p>}
      <p>Already have an account with us? <Link to="/login">Log in!</Link></p>
    </>
  );
}
