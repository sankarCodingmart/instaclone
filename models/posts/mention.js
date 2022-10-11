export default (sequelize, Sequelize) => {
  return sequelize.define("Mention", {
    mention_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    post_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  });
};

// return Promise.all([
//   queryInterface.changeColumn("User", "user_id", {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     references: {
//       model: "Account",
//       key: "id",
//       onUpdate: "CASCADE",
//       onDelete: "CASCADE",
//     },
//   }),
// ]);
