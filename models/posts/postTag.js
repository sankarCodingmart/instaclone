export default (sequelize, Sequelize) => {
  return sequelize.define("PostTag", {
    post_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tag_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};
