/* eslint-disable no-unused-vars */
// eslint-disable-next-line max-len
export default function EventCard({ user_id, location, name, date, start_time, end_time, ticket_link }) {
  return (
    <><>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h4 className="name">Event Name</h4>
            <h4 className="location">Location</h4>
            <p>Start Time:</p>
            <p>End Time:</p>
            <p>Ticket Link</p>
          </div>
        </div>
      </div>
    </>
    <>
    <div className="media-content">
        <p className="title is-4">John Smith</p>
        <p className="subtitle is-6">@johnsmith</p>
      </div>

    <div className="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br/>
      <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
    </></>

  );
}
