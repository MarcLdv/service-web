'use strict';
module.exports = (sequelize, DataTypes) => {
  const Court = sequelize.define('Court', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'available',
    },
  }, {});
  Court.associate = function(models) {
    // Ajouter associations ici
  };
  return Court;
};
