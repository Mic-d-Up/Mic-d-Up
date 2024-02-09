/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const EventCard = ({ location, date, startTime, endTime, ticketLink }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

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

  return (
    <div className="card">
      <div className="card-content">
        <p className="title">{location}</p>
        <p>Date: {date}</p>
        <p>Time: {startTime} - {endTime}</p>
        <a href={ticketLink} target="_blank" rel="noopener noreferrer">Get Tickets</a>
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
