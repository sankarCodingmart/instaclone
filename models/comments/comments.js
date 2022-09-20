export default (sequelize, Sequelize) => {
  return sequelize.define("Comments", {
    comment_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reply_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: null,
    },
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: Sequelize.INTEGER,
    },
    likes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: 0,
    },
  });
};
