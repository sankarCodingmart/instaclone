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
      queryInterface.changeColumn("CommentMention", "mention_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CommentMention", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CommentMention", "comment_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Comments",
          key: "comment_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Comments", "user_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Comments", "reply_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Comments",
          key: "comment_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Comments", "post_id", {
        type: Sequelize.INTEGER,

        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CommentTags", "comment_id", {
        type: Sequelize.INTEGER,

        references: {
          model: "Comments",
          key: "comment_id",
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
      queryInterface.changeColumn("CommentMention", "mention_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CommentMention", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CommentMention", "comment_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Comments",
          key: "comment_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Comments", "user_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Comments", "reply_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Comments",
          key: "comment_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Comments", "post_id", {
        type: Sequelize.INTEGER,

        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("CommentTags", "comment_id", {
        type: Sequelize.INTEGER,

        references: {
          model: "Comments",
          key: "comment_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
    ]);
  },
};
