const listComments = async (req, res) => {
  const {
    db: { Comment },
  } =  req;

  const comments = await Comment.list();
  res.send(comments);
};
module.exports = listComments;