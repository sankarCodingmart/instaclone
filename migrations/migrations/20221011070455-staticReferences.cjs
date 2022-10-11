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
      queryInterface.changeColumn("Artist", "music_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Music",
          key: "music_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Highlight", "user_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),

      queryInterface.changeColumn("Music", "story_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Stories",
          key: "story_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Music", "post_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("SeenBy", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("SeenBy", "story_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Stories",
          key: "story_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Stickers", "story_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Stories",
          key: "story_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Stories", "user_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Stories", "music_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Music",
          key: "music_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryMedia", "story_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Stories",
          key: "story_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryMention", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryMention", "mention_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryMention", "story_id", {
        type: Sequelize.INTEGER,
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
      queryInterface.changeColumn("Artist", "music_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Music",
          key: "music_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Highlight", "user_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),

      queryInterface.changeColumn("Music", "story_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Stories",
          key: "story_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Music", "post_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("SeenBy", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("SeenBy", "story_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Stories",
          key: "story_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Stickers", "story_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Stories",
          key: "story_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Stories", "user_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Stories", "music_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Music",
          key: "music_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryMedia", "story_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Stories",
          key: "story_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryMention", "user_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "user_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryMention", "mention_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "user_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("StoryMention", "story_id", {
        type: Sequelize.INTEGER,
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
