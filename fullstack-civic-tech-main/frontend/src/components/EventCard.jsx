/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { createComment, getAllComments } from '../adapters/comment-adapter';
import CurrentUserContext from "../contexts/current-user-context";

const EventCard = ({ event }) => {
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
      const [comment, error] = await createComment( { user_id, event_id, content });
      setUserInput('');
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <p className="title">{event.name}</p>
        <p>{event.location}</p>
        <p>Date: {event.date}</p>
        <p>Time: {event.startTime} - {event.endTime}</p>
        <a href={event.ticketLink} target="_blank" rel="noopener noreferrer">Get Tickets</a>
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
                  value={userInput}
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
