export default (sequelize, Sequelize) => {
  return sequelize.define("Artist", {
    music_id: {
      type: Sequelize.INTEGER,
    },
    artist_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    artist_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};
