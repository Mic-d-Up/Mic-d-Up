export default function CreateModal() {
  return <>
    <div id="create-modal" class="modal">
      <div class="modal-background"></div>

      <div class="modal-content">
        <div class="box">
          <h3>What's going on?</h3>
          <p>Tell us about the event</p>
          <form>
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="Name" />
              </div>
            </div>

            <div class="field">
              <label class="label">Date</label>
              <div class="control">
                <input class="input" type="date" placeholder="Date" value="bulma" />
              </div>
            </div>

            <div class="field">
              <label class="label">Start Time</label>
              <div class="control">
                <input class="input" type="time" placeholder="start time input" />
              </div>
            </div>

            <div class="field">
              <label class="label">End Time</label>
              <div class="control">
                <input class="input" type="time" placeholder="end time input" />
              </div>
            </div>

            <div class="field">
              <label class="label">Location</label>
              <div class="control">
                <textarea class="textarea" placeholder="Textarea"></textarea>
              </div>
            </div>

            <div class="field">
              <label class="label">Tickets</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link">Submit</button>
              </div>
              <div class="control">
                <button class="button is-link is-light">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <button class="modal-close is-large" aria-label="close"></button>
    </div>
  </>
}