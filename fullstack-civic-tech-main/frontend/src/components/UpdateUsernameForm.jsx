import { useNavigate } from "react-router-dom";
import { updateUsername } from "../adapters/user-adapter";
import './updateUsernameForm.css';

export default function UpdateUsernameForm({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateUsername(Object.fromEntries(formData));
    if (error?.cause > 400 && error?.cause < 500) {
      setCurrentUser(null);
      return navigate('/');
    }

    setCurrentUser(user);
    event.target.reset();
  };

  return <form className="updateUsernameForm" onSubmit={handleSubmit} aria-labelledby="update-heading">
    <h2 id="update-heading" className="updateUsernameTitle">Update Username</h2>
    <label htmlFor='username' className="updateUsernameLabel">Choose a new username</label>
    <input className="updateUsernameInput" type='text' id='username' name='username'/>
    <input className="updateUsernameInput" type="hidden" name="id" value={currentUser.id} />

    <button className="updateUsernameButton">Update Username</button>
  </form>;
}
