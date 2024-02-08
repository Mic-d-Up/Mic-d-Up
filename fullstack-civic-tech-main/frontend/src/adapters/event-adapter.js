import { fetchHandler, getPostOptions } from "../utils";

const baseUrl = '/api/events';

export const createEvent = async ({ user_id, location, date, start_time, end_time }) => {
  fetchHandler(baseUrl, getPostOptions({ user_id, location, date, start_time, end_time }));
};

export const getAllEvents = async () => {
  const [events] = await fetchHandler(baseUrl);
  return events || [];
}

export const getEvent = async (id) => fetchHandler(`${baseUrl}/${id}`);