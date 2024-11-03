"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersToSeed = [
      {
        name: "Rafly Aziz Abdillah",
        age: 30,
        address: "Jalan Jalan Ke Jalan",
        role: "Superadmin",
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
      {
        name: "Super Admin",
        age: 21,
        address: "Jalan Muara Bahari",
        role: "Superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const user of usersToSeed) {
      const existingUser = await queryInterface.rawSelect(
        "Users",
        {
          where: { name: user.name },
        },
        ["id"]
      );

      if (!existingUser) {
        await queryInterface.bulkInsert("Users", [user]);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
