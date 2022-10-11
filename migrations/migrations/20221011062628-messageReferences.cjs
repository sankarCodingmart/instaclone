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
      queryInterface.changeColumn("Message", "from_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          as: "FromTable",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Message", "to_id", {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "Accounts",
          key: "id",
          as: "ToTable",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Message", "post_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Posts",
          key: "post_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }),
      queryInterface.changeColumn("Notes", "user_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
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
