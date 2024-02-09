import { createEvent } from "../adapters/event-adapter";

export default function CreateModal({ onClose }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formInput = Object.fromEntries(formData);
    const event = await createEvent(formInput);
    console.log(formData, formInput, event);
    e.target.reset();
  }

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
                <input className="input" type="text" placeholder="Name" name="name" />
              </div>
            </div>

            <div className="field">
              <label className="label">Date</label>
              <div className="control">
                <input className="input" type="date" placeholder="Date" name="date" />
              </div>
            </div>

            <div className="field">
              <label className="label">Start Time</label>
              <div className="control">
                <input className="input" type="time" placeholder="start time input" name="start_time" />
              </div>
            </div>

            <div className="field">
              <label className="label">End Time</label>
              <div className="control">
                <input className="input" type="time" placeholder="end time input" name="end_time" />
              </div>
            </div>

            <div className="field">
              <label className="label">Location</label>
              <div className="control">
                <textarea className="textarea" placeholder="Textarea" name="location" ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">Tickets</label>
              <div className="control">
                <input className="input" type="text" name="ticket_link" />
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
  </>
}