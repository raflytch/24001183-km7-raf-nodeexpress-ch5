"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Cars",
      [
        {
          model: "Toyota Supra",
          type: "Sport",
          price: 50000.0,
          imageUrl: "https://example.com/toyota-supra.jpg",
          isAvailable: true,
          createdBy: "Admin",
          deletedBy: null,
          lastUpdatedBy: "Admin",
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model: "Honda Civic",
          type: "Sedan",
          price: 20000.0,
          imageUrl: "https://example.com/honda-civic.jpg",
          isAvailable: true,
          createdBy: "Admin",
          deletedBy: null,
          lastUpdatedBy: "Admin",
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          model: "Nissan Altima",
          type: "Sedan",
          price: 25000.0,
          imageUrl: "https://example.com/nissan-altima.jpg",
          isAvailable: false,
          createdBy: "Admin",
          deletedBy: null,
          lastUpdatedBy: "Admin",
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
