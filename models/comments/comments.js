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
      default: null,
    },
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    likes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: 0,
    },
    comment_content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};
