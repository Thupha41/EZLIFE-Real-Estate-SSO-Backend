"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ResetPasswordToken", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      userID: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      verifyToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      consumed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      expired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ResetPasswordToken");
  },
};
