"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: "roleId" });
      User.hasMany(models.ResetPasswordToken, { foreignKey: "userID" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      refreshToken: DataTypes.STRING,
      typeLogin: {
        type: DataTypes.STRING,
        defaultValue: "local",
      },
    },
    {
      sequelize: sequelize,
      modelName: "User",
      freezeTableName: true,
      tableName: "User",
    }
  );
  return User;
};
