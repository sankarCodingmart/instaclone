export default (sequelize, Sequelize) => {
  return sequelize.define("TwoFactorAuth", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    auth_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    login_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
  });
};
