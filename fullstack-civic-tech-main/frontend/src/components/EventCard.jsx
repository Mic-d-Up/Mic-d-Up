/* eslint-disable import/order */
/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { userJoinEvent, userLeaveEvent } from '../adapters/event-adapter';
import CurrentUserContext from "../contexts/current-user-context";
import "./button.css";
import "./eventCard.css";
import { createComment, getAllComments } from '../adapters/comment-adapter';


const EventCard = (props) => {
  const {event, joinedEvents, loadJoinEvents} = props
  const [userInput, setUserInput] = useState('');
  const [comments, setComments] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  const event_id = event.id;
  const handleCommentChange = (e) => {
    setUserInput(e.target.value);
  };
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const user_id = currentUser.id;
    if (userInput.trim() !== '') {
      setComments([...comments, userInput]);
      console.log(userInput)
      const content = userInput;
      const [comment, error] = await createComment( { user_id, event_id, content });
      console.log(comment, error)
      setUserInput('');
    }
  };
  
  const joinEvent = async () => {
    const row = await userJoinEvent(currentUser.id, event.id)
    setTimeout(async () => {
      console.log("ran")
      await loadJoinEvents();
    }, 50);
  };

  const leaveEvent = async () => {
    const row = await userLeaveEvent(currentUser.id, event.id)
    setTimeout(async () => {
      console.log("ran")
      await loadJoinEvents();
    }, 50);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const eventDate = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', options);
    
    const parts = formatter.formatToParts(eventDate);
    let day;
    for (const part of parts) {
      if (part.type === 'day') {
        const value = parseInt(part.value, 10);
        day = value + getDaySuffix(value);
      }
    }
    
    return `${parts.find(part => part.type === 'month').value} ${day}, ${parts.find(part => part.type === 'year').value}`;
  }
  
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }
  const formatTime = (timeRangeString) => {
    const [startTime] = timeRangeString.split(' - ');
    const [hours, minutes] = startTime.split(':'); 
    
    
    const time = new Date();
    time.setHours(hours, minutes);
    
    
    const formattedTime = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(time);
  
    return formattedTime;
  }

  return (
    <div className="">
      <div className="theHubCard">
        <p className="theHubEventTitle">{event.name}</p>
        <p className="theHubEventLocation">{event.location}</p>
        <div className="theHubEventDetails">
          <p className="theHubEventDate">{formatDate(event.date)}</p>
          <p className="theHubEventTime">{formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
        </div>
        <div className="theHubEventButtons">
          <a href={event.ticket_link} target="_blank" rel="noopener noreferrer" className="getTicketsButton">Get Tickets</a>
          { joinedEvents && joinedEvents[event.id] ? <button onClick={leaveEvent} id={joinedEvents[event.id] ? 'leave-event' : 'join-event'} className='leaveEventButton'>Leave Event</button> : <button id={joinedEvents[event.id] ? 'leave-event' : 'join-event'} className='joinEventButton' onClick={joinEvent}>Join Event</button>}
        </div>
        </div>
      <footer className="">
        <div className="commentsContainer">
          <form onSubmit={handleCommentSubmit}>
            <div className="">
              <div className="">
                <input
                  className="commentInput"
                  type="text"
                  placeholder="Add a comment..."
                  value={userInput}
                  onChange={handleCommentChange}
                />
              </div>
              <div className="">
                <button type="submit" className="commentsButton">Comment</button>
              </div>
            </div>
          </form>
        </div>
      </footer>
      <div className="card-content">
        <div className="userComment">
          {comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;