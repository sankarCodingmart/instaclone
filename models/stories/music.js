export default (sequelize, Sequelize) => {
  return sequelize.define("Music", {
    music_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    music_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    music_thumbnail_url: { type: Sequelize.STRING },
    genre: {
      type: Sequelize.STRING,
    },
  });
};
