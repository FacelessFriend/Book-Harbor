 const { Comment } = require("../../db/models");

const leaveComment = async (newComment) => {
  const data = await Comment.create(newComment);

  return data;
};

const updateUserComment = async (newComment, id) => {
  const data = await Comment.update(newComment, { where: { id: +id } });

  return data;
};

const deleteUserComment = async (id) => {
  const data = await Comment.destroy({ where: { id: +id } });

  return data;
};

module.exports = { leaveComment, updateUserComment, deleteUserComment };
