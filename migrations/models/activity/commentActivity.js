export default (sequelize, Sequelize) => {
  return sequelize.define(
    "CommentActivity",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      target_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      comment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      type: {
        //0-->like 1-->mention
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
