/* eslint-disable max-len */
const { response } = require("express");

const createUser = async (req, res) => {
  const {
    session,
    db: { User },
    body: { username, password, name, profile_pic, typeOfArtist }, // this req.body property is put here by the client
  } = req;

  // TODO: check if username is taken, what should you return?
  try {
    const user = await User.create(username, password, name, profile_pic, typeOfArtist);
    session.userId = user.id;
    res.send(user);
  } catch (e) {
    console.error(e);
    if (e.constraint === 'users_username_unique') return res.json({ error: "Username already taken." });
  }
};

module.exports = createUser;
