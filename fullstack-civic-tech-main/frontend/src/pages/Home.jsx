import CreateModal from "../components/CreateModal";
import { useState } from "react";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  return <>
    <h1>The Hub</h1>
    <p>Check out events from our community!</p>
    {
      !currentUser
      ? <button type="button" onClick={() => navigate('/login')}>New Event</button>
      : <button type="button" onClick={() => setShowModal(!showModal)}>New Event</button> 
    }
    {showModal && <CreateModal setShowModal={setShowModal} onClose={() => setShowModal(false)} />}
  </>;
}
