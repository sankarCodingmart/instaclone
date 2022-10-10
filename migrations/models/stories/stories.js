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
      likes: {
        type: Sequelize.BIGINT,
        allowNull: false,
        default: 0,
      },
      location: {
        type: Sequelize.INTEGER,
      },
      music_id: {
        type: Sequelize.INTEGER,
      },
      only_close_friends: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    },
    { timestamps: true }
  );
};
