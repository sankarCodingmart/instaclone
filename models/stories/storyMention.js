export default (sequelize, Sequelize) => {
  return sequelize.define("StoryMention", {
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
    story_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });
};
