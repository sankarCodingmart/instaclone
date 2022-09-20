export default (sequelize, Sequelize) => {
  return sequelize.define(
    "Stories",
    {
      story_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      story_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      likes: {
        type: Sequelize.BIGINT,
        allowNull: false,
        default: 0,
      },
    },
    { timestamps: true }
  );
};
