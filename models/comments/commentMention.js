export default (sequelize, Sequelize) => {
  return sequelize.define("CommentMention", {
    mention_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comment_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });
};
