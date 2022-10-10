"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("Highlight", {
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
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable("Highlight");
  },
};
