"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("Stickers", {
      sticker_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      story_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable("Stickers");
  },
};
