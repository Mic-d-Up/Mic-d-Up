const listEvents = async (req, res) => {
  const { 
    db: { Event }
  } = req; 

  const events = await Event.list();
  res.send(events);
};

module.exports = listEvents;
