const User = require("../../db/models/user");
const deleteUser = async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.find(userId);
    if (!user) return res.status(404).send('User not found');
    await User.delete(userId);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}
module.exports = deleteUser;