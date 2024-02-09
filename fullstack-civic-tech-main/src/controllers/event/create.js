const createEvent = async (req, res) => {
  const {
    session,
    db: { Event },
    body: { name, username, location, date, start_time, end_time, ticket_link },
  } = req;

  const event = await Event.create(req.body.name, req.body.username, req.body.location, req.body.date, req.body.start_time, req.body.end_time, req.body.ticket_link);

  res.send(event);
};

module.exports = createEvent;
