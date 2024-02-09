import CreateModal from "../components/CreateModal";
import { useState } from "react";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  return <>
    <h1>The Hub</h1>
    <p>Check out events from our community!</p>
    <button type="button" onClick={() => setShowModal(!showModal)}>New Event</button>
    {showModal && <CreateModal setShowModal={setShowModal} onClose={() => setShowModal(false)} />}
  </>;
}
