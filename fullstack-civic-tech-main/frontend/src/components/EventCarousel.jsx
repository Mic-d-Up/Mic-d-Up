/* eslint-disable max-len */
import React, { useState } from 'react';
import EventCard from './EventCard'; // Adjust the path as necessary

const EventCarousel = ({ events, loadJoinEvents, joinedEvents }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate the total number of slides needed to show all events three at a time
  const visibleCards = 3;
  const totalSlides = Math.ceil(events.length / visibleCards);

  const nextEvent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % totalSlides);
  };

  const prevEvent = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 + totalSlides) % totalSlides);
  };

  return (
    <div className="flex items-center  ">
      <button
        onClick={prevEvent}
        className=" left-0 z-10 absolute p-4 bg-gray-200 rounded-full shadow-lg"
      >
        Prev
      </button>

      <div className="flex overflow-hidden p-2">
        <div className="flex transition-transform ease-in-out duration-300" style={{ transform: `translateX(-${currentIndex * (100 / totalSlides)}%)` }}>
          {events.map((event, index) => (
            <div key={index} className="flex-none w-1/6" > {/* Adjust spacing as needed */}
              <EventCard key={event.id} event={event} loadJoinEvents={loadJoinEvents} joinedEvents={joinedEvents} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextEvent}
        className="right-0 z-10 p-4 absolute bg-gray-200 rounded-full shadow-lg"
      >
        Next
      </button>
    </div>
  );
};

export default EventCarousel;
