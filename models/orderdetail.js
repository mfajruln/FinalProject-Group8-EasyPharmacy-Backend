'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Order, {
        foreignKey: 'orderId'
      });
      OrderDetail.belongsTo(models.Drug, {
        foreignKey: 'drugId'
      });
    }
  }
  OrderDetail.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id'
      }
    },
    drugId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Drugs',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};