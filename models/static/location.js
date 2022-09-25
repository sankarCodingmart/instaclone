export default (sequelize, Sequelize) => {
  return sequelize.define("Location", {
    location_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    location_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};
