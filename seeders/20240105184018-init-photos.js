'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Photos', [{
      name: 'Shocked Cat',
      url: './images/shocked_cat.jpg',
      citation: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Skeptic Cat',
      url: './images/skeptic_cat.jpg',
      citation: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Smudge Cat',
      url: './images/smudge_cat.jpg',
      citation: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Wet Cat',
      url: './images/wet_cat.jpg',
      citation: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Photos', null, {});
  }
};
