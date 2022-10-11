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
      queryInterface.changeColumn("Request", "request_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Request", "requested_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CommentActivity", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CommentActivity", "target_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CommentActivity", "comment_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Comments",
          key: "comment_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("LoginActivity", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("PostActivity", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("PostActivity", "target_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("PostActivity", "post_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryActivity", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryActivity", "target_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryActivity", "story_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Stories",
          key: "story_id",
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
    return Promise.all([
      queryInterface.changeColumn("Request", "request_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Request", "requested_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CommentActivity", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CommentActivity", "target_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CommentActivity", "comment_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Comments",
          key: "comment_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("LoginActivity", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("PostActivity", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("PostActivity", "target_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("PostActivity", "post_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryActivity", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryActivity", "target_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryActivity", "story_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Stories",
          key: "story_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
    ]);
  },
};
