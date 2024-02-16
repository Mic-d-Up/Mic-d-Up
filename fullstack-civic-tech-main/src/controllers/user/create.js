const createUser = async (req, res) => {
  const {
    session,
    db: { User },
    body: { username, password, name, profile_pic, artist_type }, // this req.body property is put here by the client
  } = req;

  // TODO: check if username is taken, what should you return?
  const user = await User.create(username, password, name, profile_pic, artist_type);
  session.userId = user.id;

  res.send(user);
};

module.exports = createUser;
