/* eslint-disable react/no-unescaped-entities */
import { createEvent } from "../adapters/event-adapter";
import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function CreateModal({ onClose }) {
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
    console.log(event);
    e.target.reset();
  };

  const handleCancel = () => {
    onClose();
  };

  return <>
    <div id="create-modal" className="modal">
      <div className="modal-background"></div>

      <div className="modal-content">
        <div className="box">
          <form onSubmit={handleSubmit}>
            <h3>What's going on?</h3>
            <p>Tell us about the event</p>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="Name" name="name" onChange={e => setName(e.target.value)} />
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
                <textarea className="textarea" placeholder="Textarea" name="location" onChange={e => setLocation(e.target.value)} ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">Tickets</label>
              <div className="control">
                <input className="input" type="text" name="ticket_link" onChange={e => setTicketLink(e.target.value)} />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
              <div className="control">
                <button className="button is-link is-light" type="button" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>;
}
