"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("Posts", {
      post_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      likes: {
        type: Sequelize.INTEGER,
        default: 0,
        allowNull: false,
      },
      caption: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      reel: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      music_id: {
        type: Sequelize.INTEGER,
      },
      is_archived: {
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
    await queryInterface.dropTable("Posts");
  },
};
