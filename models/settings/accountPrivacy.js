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
    //Privacy-Type --> Block/Restrict/Muted
    privacy_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    //Privacy-Value --> True/False
    privacy_value: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });
};
