'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restock.hasMany(models.RestockDetail, {
        foreignKey: {
          name: 'restock_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Restock.init({
    date_stock: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Restock',
  });
  return Restock;
};