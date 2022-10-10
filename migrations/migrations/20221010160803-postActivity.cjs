"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("PostActivity", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      target_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      post_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      type: {
        //0-->like 1-->mention
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("PostActivity");
  },
};
