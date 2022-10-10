export default (sequelize, Sequelize) => {
  return sequelize.define("StoryMedia", {
    story_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    media_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    media_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    story_type: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
