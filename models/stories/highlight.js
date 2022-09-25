export default (sequelize, Sequelize) => {
  return sequelize.define(
    "Highlight",
    {
      story_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        primary_key: true,
      },
      highlight_name: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: "Highlights",
      },
    },
    { timestamps: true }
  );
};
