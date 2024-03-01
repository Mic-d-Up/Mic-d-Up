/* eslint-disable react/no-unescaped-entities */
import { createEvent, getAllEvents } from "../adapters/event-adapter";
import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function CreateModal(props) {
  const { onClose, getEveryEvent } = props
  const { currentUser } = useContext(CurrentUserContext);
  const user_id = currentUser.id;
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [start_time, setStartTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [ticket_link, setTicketLink] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [event, error] = await createEvent({ user_id, name, location, date, start_time, end_time, ticket_link })
    e.target.reset();
    setTimeout(async () => {
      await getEveryEvent()
    }, 100)
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return <>
    <form className="e-container" onSubmit={handleSubmit} style={{
      "color": "white"
    }}>
      <h1 className="is-size-4">What's going on?</h1>
      <p>Tell us about the event</p>
      <div className="field">
        <label className="label">Name of Event</label>
        <div className="control">
          <input className="input" type="text" placeholder="Event Title" name="name" onChange={e => setName(e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label className="label">Date</label>
        <div className="control">
          <input className="input" type="date" placeholder="Date" name="date" onChange={e => setDate(e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label className="label">Start Time</label>
        <div className="control">
          <input className="input" type="time" placeholder="start time input" name="start_time" onChange={e => setStartTime(e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label className="label">End Time</label>
        <div className="control">
          <input className="input" type="time" placeholder="end time input" name="end_time" onChange={e => setEndTime(e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label className="label">Location</label>
        <div className="control">
          <input className="input" placeholder="Location" name="location" onChange={e => setLocation(e.target.value)} ></input>
        </div>
      </div>

      <div className="field">
        <label className="label">Tickets</label>
        <div className="control">
          <input className="input" type="text" placeholder="Paste your ticket URL here" name="ticket_link" onChange={e => setTicketLink(e.target.value)} />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button" style={{"background-color": "#AB92FF", "color": "#08090C"}}>Submit</button>
        </div>
        <div className="control">
          <button className="button" type="button" style={{"background-color": "#AB92FF", "color": "#08090C"}} onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </form>
  </>;
}
