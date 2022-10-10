export default (sequelize, Sequelize) => {
  return sequelize.define("CloseFriends", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    target_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  });
};
