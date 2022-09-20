export default (sequelize, Sequelize) => {
  return sequelize.define(
    "Message",
    {
      message_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      from_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      to_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      message_content: {
        type: Sequelize.STRING,
      },
      post_id: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: true }
  );
};
