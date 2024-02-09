export default function CreateModal({ onClose }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
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
                <input className="input" type="text" placeholder="Name" />
              </div>
            </div>

            <div className="field">
              <label className="label">Date</label>
              <div className="control">
                <input className="input" type="date" placeholder="Date" value="bulma" />
              </div>
            </div>

            <div className="field">
              <label className="label">Start Time</label>
              <div className="control">
                <input className="input" type="time" placeholder="start time input" />
              </div>
            </div>

            <div className="field">
              <label className="label">End Time</label>
              <div className="control">
                <input className="input" type="time" placeholder="end time input" />
              </div>
            </div>

            <div className="field">
              <label className="label">Location</label>
              <div className="control">
                <textarea className="textarea" placeholder="Textarea"></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">Tickets</label>
              <div className="control">
                <input className="input" type="text" />
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