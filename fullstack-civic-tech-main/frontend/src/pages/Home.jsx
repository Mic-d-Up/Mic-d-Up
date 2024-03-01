/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEvents, fetchAllJoinedEvents } from "../adapters/event-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import CreateModal from "../components/CreateModal";
import EventCard from '../components/EventCard';


export default function HomePage() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState({});

  const getEveryEvent = async () => {
    const eventsObj = await getAllEvents();
    setEvents(eventsObj);
  };

  useEffect(() => {
    getEveryEvent();
  }, []);


  const navigate = useNavigate();

  const loadJoinEvents = async () => {
    if (currentUser) {
      const attendedEvents = await fetchAllJoinedEvents(currentUser.id);
      const obj = {};
      attendedEvents.map((event) => {
        console.log("should be event");
        console.log(event);
        obj[event.event_id] = true;
      });
      setJoinedEvents(obj);
    }
  };

  useEffect(() => {
    loadJoinEvents();
  }, [currentUser]);

  // const switchModalState = () => {
  //   setShowModal(showModal => showModal = !showModal);
  //   console.log(showModal);
  // }  

  return <>
    <div className="home">
      <h1 className="hub-heading">The Hub</h1>
      <p className="hub-p">Check out events from our community!</p>
      {
        !currentUser
          ? <button type="button" className="new-event-btn" onClick={() => navigate('/login')}>New Event</button>
          : <button type="button" className="new-event-btn" onClick={() => setShowModal(!showModal)}>New Event</button>
      }
      {showModal && <CreateModal getEveryEvent={getEveryEvent} setShowModal={setShowModal} onClose={() => setShowModal(false)} />}
      {events.map((event) => (<li key={event.id}>
        <EventCard event={event} loadJoinEvents={loadJoinEvents} joinedEvents={joinedEvents} />
      </li>))}
    </div>
  </>;
}
