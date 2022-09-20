export default (sequelize, Sequelize) => {
  return sequelize.define("loginActivity", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    activity_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    login_time: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    device_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    active_now: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });
};
