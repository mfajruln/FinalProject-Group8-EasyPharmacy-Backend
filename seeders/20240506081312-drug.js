'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Drugs', [
      {
        name: 'Paracetamol',
        description: 'Obat penurun demam dan pereda nyeri',
        dose: '500mg',
        drugClass: 'Bebas',
        drugFactory: 'Generik',
        drugType: 'Kaplet',
        price: 6365,
        stock: 50,
        packaging: 'Strip',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Amoxicillin',
        description: 'Antibiotik untuk mengobati infeksi bakteri, seperti infeksi saluran pernapasan, kulit, dan infeksi THT.',
        dose: '500mg',
        drugClass: 'Keras',
        drugFactory: 'Generik',
        drugType: 'Kaplet',
        price: 12000,
        stock: 75,
        packaging: 'Strip',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cetirizine',
        description: 'Obat antihistamin untuk meredakan gejala alergi, seperti pilek, bersin, mata gatal, dan ruam kulit.',
        dose: '10mg',
        drugClass: 'Keras',
        drugFactory: 'Generik',
        drugType: 'Kaplet',
        price: 4500,
        stock: 35,
        packaging: 'Strip',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('Drugs', null, {});
  }
};
