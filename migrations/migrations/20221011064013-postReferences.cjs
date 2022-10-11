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
      queryInterface.changeColumn("Media", "post_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Mention", "mention_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Mention", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Mention", "post_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Posts", "user_id", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Posts", "music_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Music",
          key: "music_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("PostTag", "post_id", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("SavedPost", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("SavedPost", "post_id", {
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
    return Promise.all([
      queryInterface.changeColumn("Media", "post_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Mention", "mention_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Mention", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Mention", "post_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Posts", "user_id", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Posts", "music_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Music",
          key: "music_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("PostTag", "post_id", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("SavedPost", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("SavedPost", "post_id", {
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
};
