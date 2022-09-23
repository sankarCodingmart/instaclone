export default (sequelize, Sequelize) => {
  return sequelize.define(
    "User",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
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
