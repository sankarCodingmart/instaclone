export default (sequelize, Sequelize) => {
  return sequelize.define("Likes", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    target_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    comment_id: {
      type: Sequelize.INTEGER,
    },
    post_id: {
      type: Sequelize.INTEGER,
    },
    story_id: {
      type: Sequelize.INTEGER,
    },
  });
};
