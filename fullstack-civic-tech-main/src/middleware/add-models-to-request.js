const User = require('../db/models/user');
const Comment = require('../db/models/comment');

const addModelsToRequest = (req, res, next) => {
  req.db = {
    User,
    Comment,
  };
  next();
};

module.exports = addModelsToRequest;
