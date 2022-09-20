export default (sequelize, Sequelize) => {
  return sequelize.define("Media", {
    post_id: {
      type: Sequelize.INTEGER,
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
  });
};
