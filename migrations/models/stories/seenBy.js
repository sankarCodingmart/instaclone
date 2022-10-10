export default (sequelize, Sequelize) => {
  return sequelize.define(
    "SeenBy",
    {
      story_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    },
    { timestamps: true }
  );
};
