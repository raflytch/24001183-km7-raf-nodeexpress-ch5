"use strict";
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash(process.env.SEED_USER_PASSWORD, 10);

    const authsToSeed = [
      {
        email: "raflyazizabdillah30@gmail.com",
        password: passwordHash,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "karinaghsn@gmail.com",
        password: passwordHash,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "superadmin@example.com",
        password: passwordHash,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const auth of authsToSeed) {
      const existingAuth = await queryInterface.rawSelect(
        "Auths",
        {
          where: { email: auth.email },
        },
        ["id"]
      );

      if (!existingAuth) {
        await queryInterface.bulkInsert("Auths", [auth]);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
