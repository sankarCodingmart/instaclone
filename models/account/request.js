export default (sequelize, Sequelize) => {
  return sequelize.define("Request", {
    request_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    requested_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });
};
