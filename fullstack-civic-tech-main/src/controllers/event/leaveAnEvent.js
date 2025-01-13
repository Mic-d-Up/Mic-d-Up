const leaveAnEvent = async (req, res) => {
  const {
    db: { Event },
    body: { user_id, event_id },
  } = req;

  const event_user = await Event.leaveEvent(user_id, event_id);
  res.send(event_user);
};

module.exports = leaveAnEvent;