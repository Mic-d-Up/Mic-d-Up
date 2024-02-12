/* eslint-disable no-unused-vars */
import { useState } from "react";
import CreateModal from "../components/CreateModal";
import EventCard from '../components/EventCard';

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  return <>
    <h1>The Hub</h1>
    <p>Check out events from our community!</p>
    <button type="button" onClick={() => setShowModal(!showModal)}>New Event</button>
    {showModal && <CreateModal setShowModal={setShowModal} onClose={() => setShowModal(false)} />}
    <div className="container">
      <EventCard
        location="Example Location"
        date="2024-02-08"
        startTime="10:00 AM"
        endTime="12:00 PM"
        ticketLink="https://example.com"
      />
    </div>
  </>;
}
