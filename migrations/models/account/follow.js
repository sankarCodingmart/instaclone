export default (sequelize, Sequelize) => {
  return sequelize.define(
    "Follow",
    {
      follower_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      followee_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
