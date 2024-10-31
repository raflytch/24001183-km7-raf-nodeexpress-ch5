"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Rafly Aziz Abdillah",
          age: 30,
          address: "Jalan Jalan Ke Jalan",
          role: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Karina Ghaisani",
          age: 25,
          address: "Jalan Ke Pelukannya",
          role: "Member",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
