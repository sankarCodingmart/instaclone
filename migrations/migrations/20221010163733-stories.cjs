"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("Stories", {
      story_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      likes: {
        type: Sequelize.BIGINT,
        allowNull: false,
        default: 0,
      },
      location: {
        type: Sequelize.INTEGER,
      },
      music_id: {
        type: Sequelize.INTEGER,
      },
      only_close_friends: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable("Stories");
  },
};
