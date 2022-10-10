export default (sequelize, Sequelize) => {
  return sequelize.define("UserSettings", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    save_login_info: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: true,
    },
  });
};
