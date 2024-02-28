/* eslint-disable import/order */
/* eslint-disable no-shadow */
// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { userJoinEvent, userLeaveEvent } from '../adapters/event-adapter';
import CurrentUserContext from "../contexts/current-user-context";
import "./button.css";
import { createComment, getAllComments } from '../adapters/comment-adapter';

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
    <div className="flex flex-col card shadow-md rounded-lg overflow-hidden max-w-xs mx-auto">
    <div className="p-4 flex flex-col gap-3">
      <p className="text-lg font-bold text-center">{event.name}</p>
      <p className="text-sm  font-semibold">Location: {event.location}</p>
      <p className="text-sm font-semibold">Date: {event.date}</p>
      <p className="text-sm font-semibold">Time: {event.startTime} - {event.endTime}</p>
      <button href={event.ticketLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-blue-500 hover:text-blue-600">Get Tickets</button>
      {joinedEvents && joinedEvents[event.id] ? (
        <button onClick={leaveEvent} className={`mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${joinedEvents[event.id] ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
          Leave Event
        </button>
      ) : (
        <button onClick={joinEvent} className="mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          Join Event
        </button>
      )}
    </div>
    <div className="px-4 py-3 bg-gray-50 text-right ">
      <form onSubmit={handleCommentSubmit} className="flex items-center gap-10">
        <input
          className="flex-1 py-2 px-4 text-sm  text-gray-700 bg-white  rounded shadow focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Add a comment..."
          value={userInput}
          onChange={handleCommentChange}
        />
        <button type="submit" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
          Comment
        </button>
      </form>
    </div>
    <div className="p-4">
      <div className="space-y-2">
        {comments.map((comment, index) => (
          <p key={index} className="text-sm text-gray-600">{comment}</p>
        ))}
      </div>
    </div>
  </div>
);
};
export default EventCard;
