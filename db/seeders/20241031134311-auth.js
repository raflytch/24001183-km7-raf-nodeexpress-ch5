"use strict";
const bcrypt = require("bcrypt");
require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash(process.env.SEED_USER_PASSWORD, 10);

    await queryInterface.bulkInsert(
      "Auths",
      [
        {
          email: "raflyazizabdillah30gmail.com",
          password: passwordHash,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "karinaghsngmail.com",
          password: passwordHash,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
