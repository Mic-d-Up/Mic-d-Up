import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = '/api/';

export const createComment = async ({ user_id, event_id, content }) => {
  return await fetchHandler(`${baseUrl}/users/${user_id}/events/${event_id}/comments`, getPostOptions({ user_id, event_id, content }))
};

export const getAllComments = async () => {
  const [comments] = await fetchHandler(baseUrl);
  return comments || [];
};

export const getSingleComment = async (id) => fetchHandler(`${baseUrl}/${id}`);

// export const updateComment = async ({ id, user_id }) => (
//   fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, user_id }))
// );
