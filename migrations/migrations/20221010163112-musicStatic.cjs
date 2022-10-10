"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("MusicStatic", {
      music_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      music_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      music_thumbnail_url: { type: Sequelize.STRING },
      genre: {
        type: Sequelize.STRING,
      },
      music_url: {
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
    await queryInterface.dropTable("MusicStatic");
  },
};
