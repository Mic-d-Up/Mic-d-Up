import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = '/api/comments';

export const createComment = async ({ user_id, event_id, content }) => (
  fetchHandler(baseUrl, getPostOptions({ user_id, event_id, content }))
);

export const getAllComments = async () => {
  const [comments] = await fetchHandler(baseUrl);
  return comments || [];
};

export const getSingleComment = async (id) => fetchHandler(`${baseUrl}/${id}`);

// export const updateComment = async ({ id, user_id }) => (
//   fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, user_id }))
// );
