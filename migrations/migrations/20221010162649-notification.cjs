"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("Notification", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      like: {
        type: Sequelize.INTEGER,
        default: 2,
      },
      photo: {
        type: Sequelize.INTEGER,
        default: 2,
      },
      comments: {
        type: Sequelize.INTEGER,
        default: 2,
      },
      comment_like: {
        type: Sequelize.INTEGER,
        default: 2,
      },
      first: {
        type: Sequelize.INTEGER,
        default: 2,
      },
      follower_req: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      accept_req: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      account_suggestion: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      message_req: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      message: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      message_reminder: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      unrecognized: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      reminder: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      recent_reel: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      most_watched_reel: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Notification");
  },
};
