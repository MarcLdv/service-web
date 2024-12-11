"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Slots extends Model {
    static associate(models) {
      Slots.belongsTo(models.Court, { foreignKey: "courtId" });
    }
  }
  Slots.init(
    {
      name: DataTypes.STRING,
      schedule: DataTypes.DATE,
      status: DataTypes.STRING,
      courtId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Slots",
      tableName: "Slots", // Use the table name "Slots"
    }
  );
  return Slots;
};
