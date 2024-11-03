const swaggerJsDoc = require("swagger-jsdoc");
const systemAPI = require("../api/systemAPI");
const authAPI = require("../api/authAPI");
const userAPI = require("../api/userAPI");
const carAPI = require("../api/carAPI");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Car Management System RESTful API",
      version: "1.0.0",
      description: "API documentation for Car Management System",
      contact: {
        name: "Rafly Aziz Abdillah",
        email: "raflyazizabdillah30@gmail.com",
        url: "https://github.com/raflytch",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["../api/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

Object.assign(swaggerDocs.paths, systemAPI.paths);
Object.assign(swaggerDocs.paths, authAPI.paths);
Object.assign(swaggerDocs.paths, userAPI.paths);
Object.assign(swaggerDocs.paths, carAPI.paths);

module.exports = swaggerDocs;
