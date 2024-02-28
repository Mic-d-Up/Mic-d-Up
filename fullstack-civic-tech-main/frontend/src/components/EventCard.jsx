/* eslint-disable import/order */
/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { userJoinEvent, userLeaveEvent } from '../adapters/event-adapter';
import CurrentUserContext from "../contexts/current-user-context";
import "./button.css";
import { createComment, getAllComments } from '../adapters/comment-adapter';
import { Button, Card } from 'react-bootstrap';

const EventCard = (props) => {
  const { event, joinedEvents, loadJoinEvents } = props;
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
      const content = userInput;
      const [comment, error] = await createComment({ user_id, event_id, content });
      setUserInput('');
    }
  };

  const joinEvent = async () => {
    const row = await userJoinEvent(currentUser.id, event.id);
    setTimeout(async () => {
      console.log("ran");
      await loadJoinEvents();
    }, 50);
  };

  const leaveEvent = async () => {
    const row = await userLeaveEvent(currentUser.id, event.id);
    setTimeout(async () => {
      console.log("ran");
      await loadJoinEvents();
    }, 50);
  };

  return (

    <Card className="event-card">
    <Card.Body>
      <Card.Title>{event.name}</Card.Title>
      <Card.Text>
        {event.location}
        <br />
        Date: {event.date}
        <br />
        Time: {event.startTime} - {event.endTime}
      </Card.Text>
      <Button variant="primary" href={event.ticketLink} target="_blank" rel="noopener noreferrer">Get Tickets</Button>
      {joinedEvents && joinedEvents[event.id] ? 
        <Button onClick={leaveEvent} variant="secondary">Leave Event</Button> :
        <Button onClick={joinEvent} variant="secondary">Join Event</Button>
      }
    </Card.Body>
    <Card.Footer>
      <form onSubmit={handleCommentSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Add a comment..."
            value={userInput}
            onChange={handleCommentChange}
          />
        </div>
        <Button type="submit" variant="primary">Comment</Button>
      </form>
      <div className="card-content">
        <div className="content">
          {comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
      </div>
    </Card.Footer>
  </Card>

  );
};

export default EventCard;
