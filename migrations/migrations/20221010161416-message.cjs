"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("Message", {
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
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable("Message");
  },
};
