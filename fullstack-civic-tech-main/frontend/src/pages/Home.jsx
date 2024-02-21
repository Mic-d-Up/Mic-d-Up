/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import { getAllEvents } from "../adapters/event-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import { useNavigate } from "react-router-dom";
import CreateModal from "../components/CreateModal";
import EventCard from '../components/EventCard';

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getAllEvents().then(setEvents);
  }, []);
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
    {events.map(event => {
      <li key={event.id}>
        <EventCard event={event} />
      </li>
    })}
    {showModal && <CreateModal setShowModal={setShowModal} onClose={() => setShowModal(false)} />}
  </>;
};