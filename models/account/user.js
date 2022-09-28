export default (sequelize, Sequelize) => {
  return sequelize.define(
    "User",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      profile_pic_url: {
        type: Sequelize.STRING,
      },
      private_account: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      bio: {
        type: Sequelize.STRING,
      },
      website_url: {
        type: Sequelize.STRING,
      },
      profile_story: {
        type: Sequelize.BOOLEAN,
      },
    },
    { timestamps: true }
  );
};
