/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

// import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';
// // import { Carousel } from "../components/Carousel";
// import { getAllEvents, fetchAllJoinedEvents } from "../adapters/event-adapter";
// import CurrentUserContext from "../contexts/current-user-context";
// import CreateModal from "../components/CreateModal";
// import EventCard from '../components/EventCard';
// import 'swiper/swiper-bundle.css';

// SwiperCore.use([Navigation, Pagination, Autoplay]);

// export default function HomePage() {
//   const { currentUser } = useContext(CurrentUserContext);
//   const [showModal, setShowModal] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [joinedEvents, setJoinedEvents] = useState({});
//   const getEveryEvent = async () => {
//     const eventsObj = await getAllEvents();
//     console.log(eventsObj);
//     setEvents(eventsObj);
//   };
//   useEffect(() => {
//     getEveryEvent();
//   }, []);
//   const navigate = useNavigate();
//   const loadJoinEvents = async () => {
//     console.log("guh");
//     if (currentUser) {
//       const attendedEvents = await fetchAllJoinedEvents(currentUser.id);
//       console.log(attendedEvents);
//       const obj = {};
//       attendedEvents.map((event) => {
//         console.log("should be event");
//         console.log(event);
//         obj[event.event_id] = true;
//       });
//       setJoinedEvents(obj);
//     }
//   };

//   useEffect(() => {
//     loadJoinEvents();
//   }, [currentUser]);

//   return <>
//     <h1>The Hub</h1>
//     <p>Check out events from our community!</p>
//     <button onClick={loadJoinEvents}>Test</button>
//     {
//       !currentUser
//         ? <button type="button" onClick={() => navigate('/login')}>New Event</button>
//         : <button type="button" onClick={() => setShowModal(!showModal)}>New Event</button>
//     }
//     {events.map((event) => (<li key={event.id}>
//         <EventCard event={event} loadJoinEvents={loadJoinEvents} joinedEvents={joinedEvents} />
//       </li>))}
//     {console.log(joinedEvents)}
//     {showModal && <CreateModal getEveryEvent= {getEveryEvent} setShowModal={setShowModal} onClose={() => setShowModal(false)} />}
//   </>;
// }





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
      attendedEvents.forEach(event => {
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
    
      <h1 className="text-2xl font-bold">The Hub</h1>  {(
        <button
          className="text-white  w-fit bg-[#211F22] hover:bg-[#FFFFFF] font-bold py-2 px-4 rounded"
          onClick={() => setShowModal(true)}
        >
          New Event
        </button>
      )}
    </div>
      
    <EventCarousel events={events} />
    {showModal && <CreateModal setShowModal={setShowModal} />}
    </div>
 
  );
}
