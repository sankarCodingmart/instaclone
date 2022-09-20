export default (sequelize, Sequelize) => {
  return sequelize.define(
    "Account",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.BIGINT,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_pic_url: {
        type: Sequelize.STRING,
      },
      private_account: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      bio: {
        type: Sequelize.STRING,
      },
      website_url: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: true }
  );
};
