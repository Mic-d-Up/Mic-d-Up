import { fetchHandler, getPostOptions } from "../utils";

const baseUrl = '/api/events';

export const createEvent = async ({ name, username, location, date, start_time, end_time, ticket_link }) => {
  fetchHandler(baseUrl, getPostOptions({ name, username, location, date, start_time, end_time, ticket_link }));
};

export const getAllEvents = async () => {
  const [events] = await fetchHandler(baseUrl);
  return events || [];
}

export const getEvent = async (id) => fetchHandler(`${baseUrl}/${id}`);