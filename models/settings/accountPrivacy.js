export default (sequelize, Sequelize) => {
  return sequelize.define("AccountPrivacy", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    target_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    privacy_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    save_login_info: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: true,
    },
  });
};
