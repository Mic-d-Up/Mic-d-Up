const createEvent = async (req, res) => {
  const {
    session,
    db: { Event },
    body: { name, user_id, location, date, start_time, end_time, ticket_link },
  } = req;

  // eslint-disable-next-line max-len
  const event = await Event.create(name, user_id, location, date, start_time, end_time, ticket_link);
  console.log(req.body);
  res.send(event);
};

module.exports = createEvent;
