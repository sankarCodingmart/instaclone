export default (sequelize, Sequelize) => {
  return sequelize.define(
    "Posts",
    {
      post_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      likes: {
        type: Sequelize.INTEGER,
        default: 0,
        allowNull: false,
      },
      caption: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      reel: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      music_id: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: true }
  );
};
