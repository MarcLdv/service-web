'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo(models.User, { foreignKey: 'userId' });
      Reservation.belongsTo(models.Slots, { foreignKey: 'slotId' });
      Reservation.belongsTo(models.Court, { foreignKey: 'courtId' });
    }
  }
  Reservation.init({
    userId: DataTypes.INTEGER,
    slotId: DataTypes.INTEGER,
    courtId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};
