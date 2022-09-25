export default (sequelize, Sequelize) => {
  return sequelize.define(
    "Account",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      phone_number: {
        type: Sequelize.BIGINT,
      },
      user_name: {
        type: Sequelize.STRING,
        // allowNull: false,
        unique: true,
      },
    },
    { timestamps: true }
  );
};
