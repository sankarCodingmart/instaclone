export default (sequelize, Sequelize) => {
  return sequelize.define("Music", {
    music_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    story_id: {
      type: Sequelize.INTEGER,
    },
    post_id: {
      type: Sequelize.INTEGER,
    },
  });
};
