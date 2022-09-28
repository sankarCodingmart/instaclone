export default (sequelize, Sequelize) => {
  return sequelize.define(
    "SavedPost",
    {
      post_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      group_name: {
        type: Sequelize.STRING,
        default: "all",
      },
    },
    { timestamps: true }
  );
};
