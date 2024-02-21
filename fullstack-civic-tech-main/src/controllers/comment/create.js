const createComment = async (req, res) => {
  const {
    session,
    db: { Comment },
    body: { content },
    params: { user_id, event_id }
  } = req;


  const comment = await Comment.create(user_id, event_id, content);
  session.userId = user.id;
  res.send(comment);
}


module.exports = createComment;