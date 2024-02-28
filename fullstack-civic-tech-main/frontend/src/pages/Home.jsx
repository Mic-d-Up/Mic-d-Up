/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// import { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllEvents, fetchAllJoinedEvents } from "../adapters/event-adapter";
// import CurrentUserContext from "../contexts/current-user-context";
// import CreateModal from "../components/CreateModal";
// import EventCard from '../components/EventCard';
// import { Carousel } from 'react-bootstrap';

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

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Row, Col } from 'react-bootstrap';
import { getAllEvents, fetchAllJoinedEvents } from "../adapters/event-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import CreateModal from "../components/CreateModal";
import EventCard from '../components/EventCard';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage() {
  const { currentUser } = useContext(CurrentUserContext);
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
      attendedEvents.forEach((event) => {
        obj[event.event_id] = true;
      });
      setJoinedEvents(obj);
    }
  };

  useEffect(() => {
    loadJoinEvents();
  }, [currentUser]);

  return (
    <div className="carousel-container">
  <h1>The Hub</h1>
  <p>Check out events from our community!</p>
  <div className="cs">
    {/* Conditional rendering for 'New Event' button based on currentUser */}
    {!currentUser
      ? <button type="button" onClick={() => navigate('/login')}>New Event</button>
      : <button type="button" onClick={() => setShowModal(!showModal)}>New Event</button>
    }
    {/* Carousel component */}
    <Carousel interval={null} className="custom-carousel">
      {/* Render multiple cards within each Carousel.Item */}
      {events.map((event, index) => (
        index % 4 === 0 && (
          <Carousel.Item key={index}>
            {/* Center the content horizontally */}
            <div className="row justify-content-center">
              {events.slice(index, index + 3).map((event, subIndex) => (
                <div key={subIndex} className="col-md-3 mb-3">
                  <EventCard event={event} loadJoinEvents={loadJoinEvents} joinedEvents={joinedEvents} />
                </div>
              ))}
            </div>
          </Carousel.Item>
        )
      ))}
    </Carousel>
  </div>
  {/* Modal component */}
  {showModal && <CreateModal getEveryEvent={getEveryEvent} setShowModal={setShowModal} onClose={() => setShowModal(false)} />}
</div>

  );
}
