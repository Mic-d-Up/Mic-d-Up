import { fetchHandler, getPostOptions } from "../utils";

const deleteOptions = (body) => ({
  method: 'DELETE',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});


const baseUrl = '/api/events';

export const createEvent = async ({ name, user_id, location, date, start_time, end_time, ticket_link }) => fetchHandler(`api/users/${user_id}/events`, getPostOptions({ name, user_id, location, date, start_time, end_time, ticket_link }));

export const userJoinEvent = async (user_id, event_id) => fetchHandler(`api/Event_Users`, getPostOptions({ user_id, event_id }));

export const userLeaveEvent = async (user_id, event_id) => fetchHandler(`api/Event_Users`, deleteOptions({ user_id, event_id }));

export const getAllEvents = async () => {
  const [events] = await fetchHandler(baseUrl);
  return events || [];
};

export const fetchAllJoinedEvents = async (user_id) => {
  const [events] = await fetchHandler(`/api/allEvents/${user_id}`);
  return events;
};

export const getEvent = async (id) => fetchHandler(`${baseUrl}/${id}`);
