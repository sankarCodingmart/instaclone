export default (sequelize, Sequelize) => {
  return sequelize.define(
    "PostActivity",
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      target_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      post_id: {
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
