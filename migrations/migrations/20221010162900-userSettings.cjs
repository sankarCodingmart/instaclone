"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("UserSettings", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      save_login_info: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable("UserSettings");
  },
};
