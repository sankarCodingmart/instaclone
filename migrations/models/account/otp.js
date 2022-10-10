export default (sequelize, Sequelize) => {
  return sequelize.define("Otp", {
    mail_id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    otp_code: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
