/* eslint-disable max-len */
const joinAnEvent = async (req, res) => {
  const {
    db: { Event },
    body: { user_id, event_id },
  } = req;

  const event_user = await Event.joinEvent(user_id, event_id);
  res.send(event_user);
};

module.exports = joinAnEvent;
