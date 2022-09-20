export default (sequelize, Sequelize) => {
  return sequelize.define("Stickers", {
    sticker_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sticker_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sticker_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    story_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
