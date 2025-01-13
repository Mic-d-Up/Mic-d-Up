const listUsers = async (req, res) => {
  const {
    db: { User }
  } = req;

  const users = await User.list();
  res.send(users);
};

module.exports = listUsers;