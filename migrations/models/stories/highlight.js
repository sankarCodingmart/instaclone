export default (sequelize, Sequelize) => {
  return sequelize.define(
    "Highlight",
    {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      highlight_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      highlight_name: {
        type: Sequelize.STRING,
        allowNull: false,
        default: "Highlights",
      },
      highlight_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
