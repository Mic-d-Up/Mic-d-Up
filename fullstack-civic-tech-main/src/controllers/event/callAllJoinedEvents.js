const callAllJoinedEvents = async (req, res) => {
  const {
    db: { Event },
    params: {user_id},
  } = req;

  const events = await Event.getAllJoinedEvents(user_id);
  res.send(events);
};

module.exports = callAllJoinedEvents;
