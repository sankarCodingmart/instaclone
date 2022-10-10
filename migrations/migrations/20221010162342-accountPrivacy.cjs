"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("AccountPrivacy", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      target_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      //Privacy-Type --> Block/Restrict/Muted
      privacy_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      //Privacy-Value --> True/False
      privacy_value: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("AccountPrivacy");
  },
};
