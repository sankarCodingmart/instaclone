export default (sequelize, Sequelize) => {
  return sequelize.define(
    "Notes",
    {
      note_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      note_content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      only_close_friends: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    },
    { timestamps: true }
  );
};
