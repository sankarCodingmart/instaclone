export default (sequelize, Sequelize) => {
  return sequelize.define("Stickers", {
    sticker_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    story_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });
};
