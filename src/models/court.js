'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Court extends Model {
    static associate(models) {
      Court.hasMany(models.Slots, { foreignKey: 'courtId' });
      Court.hasMany(models.Reservation, { foreignKey: 'courtId' });
    }
  }
  Court.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Court',
  });
  return Court;
};