/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { userJoinEvent, userLeaveEvent } from '../adapters/event-adapter';
import CurrentUserContext from "../contexts/current-user-context";
import "./button.css" 

const EventCard = (props) => {
  const {event, joinedEvents, loadJoinEvents} = props
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const { currentUser } = useContext(CurrentUserContext);
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
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


  return (
    <div className="card">
      <div className="card-content">
        <p className="title">{event.name}</p>
        <p>{event.location}</p>
        <p>Date: {event.date}</p>
        <p>Time: {event.startTime} - {event.endTime}</p>
        <a href={event.ticketLink} target="_blank" rel="noopener noreferrer">Get Tickets</a>
        { joinedEvents && joinedEvents[event.id] ? <button onClick={leaveEvent} className={joinedEvents[event.id] ? 'leave-event' : 'join-event'}>Leave Event</button> : <button className={joinedEvents[event.id] ? 'leave-event' : 'join-event'} onClick={joinEvent}>Join Event</button>}
      </div>
      <footer className="card-footer">
        <div className="card-footer-item">
          <form onSubmit={handleCommentSubmit}>
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={handleCommentChange}
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-primary">Comment</button>
              </div>
            </div>
          </form>
        </div>
      </footer>
      <div className="card-content">
        <div className="content">
          {comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
