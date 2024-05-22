'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Drug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Drug.hasMany(models.Cart, {
        foreignKey: 'drugId'
      });
      Drug.hasMany(models.OrderDetail);
      // Drug.belongsTo(models.Dose);
      // Drug.belongsTo(models.DrugClass);
      // Drug.belongsTo(models.DrugFactory);
      // Drug.belongsTo(models.DrugType);

      // Drug.hasOne(models.DrugStock, {
      //   foreignKey: {
      //     name: 'drug_id',
      //   },
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });
    }
  }
  Drug.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    dose: {
      type: DataTypes.STRING,
      allowNull: false
    },
    drugClass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    drugFactory: DataTypes.STRING,
    drugType: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    packaging: DataTypes.STRING,
    isActive: {
      type : DataTypes.STRING,
      defaultValue: 'active',
    }
  }, {
    sequelize,
    modelName: 'Drug',
  });
  return Drug;
};