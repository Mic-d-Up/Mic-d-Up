const createEvent = async (req, res) => {
  const {
    session,
    db: { Event },
    body: { user_id, location, date, start_time, end_time },
  } = req;

  const event = await Event.create(user_id, location, date, start_time, end_time);
  session.userId = user_id;

  res.send(event);
};

module.exports = createEvent;
