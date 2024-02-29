import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import EventCarousel from '../components/EventCarousel';
import CurrentUserContext from "../contexts/current-user-context";
import CreateModal from "../components/CreateModal";
import { getAllEvents, fetchAllJoinedEvents } from '../adapters/event-adapter';

export default function HomePage() {
  const { currentUser } = useContext(CurrentUserContext);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState({});

  // Function to fetch all events
  const getEveryEvent = async () => {
    const eventsObj = await getAllEvents();
    setEvents(eventsObj);
  };

  // Fetch events on initial render
  useEffect(() => {
    getEveryEvent();
  }, []);

  // Function to load joined events
  const loadJoinEvents = async () => {
    if (currentUser) {
      const attendedEvents = await fetchAllJoinedEvents(currentUser.id);
      const obj = {};
      attendedEvents.forEach((event) => {
        obj[event.event_id] = true;
      });
      setJoinedEvents(obj);
    }
  };

  // Load joined events when currentUser changes
  useEffect(() => {
    loadJoinEvents();
  }, [currentUser]);

  // Navigation hook for redirecting
  const navigate = useNavigate();

  return (
    <div className=" p-4 h-[100vh] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(136,3,212,1)_0%,rgba(0,0,0,1)_100%)]">
    <div className=" flex flex-col gap-5 mb-20">

      <h1 className="text-2xl font-bold">The Hub</h1>
       {
      !currentUser
        ? <button className="text-white  w-fit bg-[#211F22] hover:bg-[#FFFFFF] font-bold py-2 px-4 rounded" type="button" onClick={() => navigate('/login')}>New Event</button>
        : <button className="text-white  w-fit bg-[#211F22] hover:bg-[#FFFFFF] font-bold py-2 px-4 rounded" type="button" onClick={() => setShowModal(!showModal)}>New Event</button>
    }
    </div>

    <EventCarousel events={events} />
    {showModal && <CreateModal setShowModal={setShowModal} />}
    </div>

  );
}
