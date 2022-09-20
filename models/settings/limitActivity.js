export default (sequelize, Sequelize) => {
  return sequelize.define("LimitActivity", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    limit_time: {
      type: "TIMESTAMP",
      allowNull: false,
    },
    limit: {
      type: Sequelize.BOOLEAN,
    },
  });
};
