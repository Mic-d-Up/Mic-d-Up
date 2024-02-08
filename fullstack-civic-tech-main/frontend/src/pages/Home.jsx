// eslint-disable-next-line no-unused-vars
import React from 'react';
import './HubHome.css';
import EventCard from '../components/EventCard';

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
