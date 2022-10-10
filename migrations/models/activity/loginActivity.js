export default (sequelize, Sequelize) => {
  return sequelize.define(
    "LoginActivity",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      activity_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
