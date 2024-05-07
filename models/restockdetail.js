'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestockDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RestockDetail.belongsTo(models.Restock);
    }
  }
  RestockDetail.init({
    restock_id: DataTypes.INTEGER,
    drug_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    expired_date: DataTypes.DATE,
    packaging_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RestockDetail',
  });
  return RestockDetail;
};