'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Drugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image:DataTypes.STRING,
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description:DataTypes.STRING,
      dose: {
        type: Sequelize.STRING,
        allowNull: false
      },
      drugClass: {
        type: Sequelize.STRING,
        allowNull: false
      },
      drugFactory: DataTypes.STRING,
      drugType: DataTypes.STRING,
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      packaging: DataTypes.STRING,
      isActive: {
        type: DataTypes.STRING,
        defaultValue: 'active',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Drugs');
  }
};