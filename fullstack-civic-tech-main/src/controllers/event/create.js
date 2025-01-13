const createEvent = async (req, res) => {
  const {
    session,
    db: { Event },
    body: { name, user_id, location, date, start_time, end_time, ticket_link },
    params: { }
  } = req;
  const event = await Event.create(name, user_id, location, date, start_time, end_time, ticket_link);
  res.send(event);
};

module.exports = createEvent;