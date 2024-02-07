// eslint-disable-next-line no-unused-vars
import React from 'react';
import './styles.css';

const EventCard = ({ title, imageSrc, description }) => (
  <div className="event-card">
    <img src={imageSrc} alt={title} className="event-image" />
    <div className="event-details">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

const Hub = () => (
    <div className="hub">
      <h1>Hub</h1>
      <div className="event-container">
        <EventCard
          title="Event 1"
          imageSrc="/img/300.png"
          description="Description of Event 1"
        />
        <EventCard
          title="Event 2"
          imageSrc="/img/300.png"
          description="Description of Event 2"
        />
        <EventCard
          title="Event 3"
          imageSrc="/img/300.png"
          description="Description of Event 3"
        />
      </div>
    </div>
);

export default Hub;
