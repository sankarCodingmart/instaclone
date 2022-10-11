"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.changeColumn("CloseFriends", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CloseFriends", "target_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Follow", "follower_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          as: "follower",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Follow", "followee_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          as: "following",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Likes", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Likes", "target_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Likes", "comment_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Comments",
          key: "comment_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Likes", "story_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Stories",
          key: "story_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Likes", "post_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
