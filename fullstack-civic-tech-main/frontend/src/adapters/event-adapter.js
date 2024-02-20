/* eslint-disable max-len */
import { fetchHandler, getPostOptions } from "../utils";

const baseUrl = '/api/home';

export const createEvent = async ({ name, location, date, start_time, end_time, ticket_link }, user_id,) => {
  fetchHandler(baseUrl, getPostOptions({ name, location, date, start_time, end_time, ticket_link }, user_id,));
};

export const getAllEvents = async () => {
  const [events] = await fetchHandler(baseUrl);
  return events || [];
};

export const getEvent = async (id) => fetchHandler(`${baseUrl}/${id}`);
