/* eslint-disable max-len */
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEvents, fetchAllJoinedEvents } from "../adapters/event-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import CreateModal from "../components/CreateModal";
import EventCard from '../components/EventCard';
import "./home.css";


export default function HomePage() {
  const { currentUser } = useContext(CurrentUserContext);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState({});
  const getEveryEvent = async () => {
    const eventsObj = await getAllEvents();
    console.log(eventsObj);
    setEvents(eventsObj);
  };
  useEffect(() => {
    getEveryEvent();
  }, []);

 
  const navigate = useNavigate();

  const loadJoinEvents = async () => {
    console.log("guh");
    if (currentUser) {
      const attendedEvents = await fetchAllJoinedEvents(currentUser.id);
      console.log(attendedEvents);
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



  return <>
    <h1 className="theHubHeading">The Hub</h1>
    <p className="theHubSubtitle">Check out events from our community!</p>
    {
      !currentUser
        ? <button type="button" className="newEventButton" onClick={() => navigate('/login')}>New Event</button>
        : <button type="button" className="newEventButton" onClick={() => setShowModal(!showModal)}>New Event</button>
    }
    <ul className="eventCardList">
    {events.map((event) => (<li className="eventCardListItem" key={event.id}>
        <EventCard event={event} loadJoinEvents={loadJoinEvents} joinedEvents={joinedEvents} />
      </li>))}</ul>
    {console.log(joinedEvents)}
    {showModal && <CreateModal getEveryEvent= {getEveryEvent} setShowModal={setShowModal} onClose={() => setShowModal(false)} />}
  </>;
}