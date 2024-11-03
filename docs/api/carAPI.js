module.exports = {
  paths: {
    "/cars": {
      get: {
        summary: "Get all cars",
        tags: ["Cars API"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: "query",
            name: "isAvailable",
            schema: {
              type: "boolean",
            },
            description: "Filter by availability status",
          },
          {
            in: "query",
            name: "name",
            schema: {
              type: "string",
            },
            description: "Filter by car name/model",
          },
          {
            in: "query",
            name: "type",
            schema: {
              type: "string",
            },
            description: "Filter by car type",
          },
          {
            in: "query",
            name: "price",
            schema: {
              type: "integer",
            },
            description: "Filter by exact price",
          },
          {
            in: "query",
            name: "maxPrice",
            schema: {
              type: "integer",
            },
            description: "Filter by maximum price",
          },
          {
            in: "query",
            name: "minPrice",
            schema: {
              type: "integer",
            },
            description: "Filter by minimum price",
          },
        ],
        responses: {
          200: {
            description: "Successfully retrieved cars",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Success" },
                    message: {
                      type: "string",
                      example: "Successfully get cars from the database",
                    },
                    data: {
                      type: "object",
                      properties: {
                        cars: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "integer" },
                              model: { type: "string" },
                              type: { type: "string" },
                              price: { type: "integer" },
                              imageUrl: { type: "string" },
                              isAvailable: { type: "boolean" },
                              createdBy: { type: "string" },
                              deletedBy: { type: "string", nullable: true },
                              lastUpdatedBy: { type: "string" },
                              deletedAt: { type: "string", nullable: true },
                              createdAt: {
                                type: "string",
                                format: "date-time",
                              },
                              updatedAt: {
                                type: "string",
                                format: "date-time",
                              },
                            },
                          },
                        },
                        totalData: { type: "integer" },
                        totalPages: { type: "integer" },
                        prevPage: { type: "integer" },
                        nextPage: { type: "integer" },
                      },
                    },
                    isError: { type: "boolean", example: false },
                    isSuccess: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized access",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Error" },
                    message: {
                      type: "string",
                      example: "Unauthorized access because of missing token",
                    },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          token: { type: "null" },
                          data: { type: "null" },
                        },
                      },
                    },
                    isError: { type: "boolean", example: true },
                    isSuccess: { type: "boolean", example: false },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new car",
        tags: ["Cars API"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  model: { type: "string", example: "Toyota Avanza" },
                  type: { type: "string", example: "Veloz" },
                  price: { type: "integer", example: 100000 },
                  image: {
                    type: "string",
                    format: "binary",
                    description: "Car image file",
                  },
                },
                required: ["model", "type", "price", "image"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Car created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Success" },
                    message: {
                      type: "string",
                      example: "Successfully create car",
                    },
                    data: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        model: { type: "string" },
                        type: { type: "string" },
                        price: { type: "integer" },
                        imageUrl: { type: "string" },
                        isAvailable: { type: "boolean" },
                        createdBy: { type: "string" },
                        lastUpdatedBy: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                      },
                    },
                    isError: { type: "boolean", example: false },
                    isSuccess: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Error" },
                    message: {
                      type: "string",
                      example: "Model, type and price are required",
                    },
                    data: { type: "null" },
                    isError: { type: "boolean", example: true },
                    isSuccess: { type: "boolean", example: false },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized access",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Error" },
                    message: {
                      type: "string",
                      example: "Unauthorized access because of invalid role",
                    },
                    data: { type: "null" },
                    isError: { type: "boolean", example: true },
                    isSuccess: { type: "boolean", example: false },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/cars/{id}": {
      get: {
        summary: "Get car by ID",
        tags: ["Cars API"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
            },
            description: "Car ID",
          },
        ],
        responses: {
          200: {
            description: "Successfully retrieved car",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Success" },
                    message: {
                      type: "string",
                      example: "Successfully get car from the database",
                    },
                    data: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        model: { type: "string" },
                        type: { type: "string" },
                        price: { type: "integer" },
                        imageUrl: { type: "string" },
                        isAvailable: { type: "boolean" },
                        createdBy: { type: "string" },
                        deletedBy: { type: "string", nullable: true },
                        lastUpdatedBy: { type: "string" },
                        deletedAt: { type: "string", nullable: true },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                      },
                    },
                    isError: { type: "boolean", example: false },
                    isSuccess: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          404: {
            description: "Car not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Error" },
                    message: { type: "string", example: "Car not found" },
                    data: { type: "null" },
                    isError: { type: "boolean", example: true },
                    isSuccess: { type: "boolean", example: false },
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        summary: "Update car by ID",
        tags: ["Cars API"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
            },
            description: "Car ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  model: { type: "string", example: "Yamaha Brio" },
                  type: { type: "string", example: "Mini Car" },
                  price: { type: "integer", example: 9000000 },
                  isAvailable: { type: "boolean", example: false },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Car updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Success" },
                    message: {
                      type: "string",
                      example: "Successfully update car",
                    },
                    updatedBy: { type: "string" },
                    lastUpdatedBy: { type: "string" },
                    data: {
                      type: "object",
                      properties: {
                        model: { type: "string" },
                        type: { type: "string" },
                        price: { type: "integer" },
                        isAvailable: { type: "boolean" },
                      },
                    },
                    isError: { type: "boolean", example: false },
                    isSuccess: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          404: {
            description: "Car not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Error" },
                    message: { type: "string", example: "Car not found" },
                    data: { type: "null" },
                    isError: { type: "boolean", example: true },
                    isSuccess: { type: "boolean", example: false },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete car by ID",
        tags: ["Cars API"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "integer",
            },
            description: "Car ID",
          },
        ],
        responses: {
          200: {
            description: "Car deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Success" },
                    message: {
                      type: "string",
                      example: "Successfully delete car",
                    },
                    deletedBy: { type: "string" },
                    lastUpdatedBy: { type: "string" },
                    data: { type: "null" },
                    isError: { type: "boolean", example: false },
                    isSuccess: { type: "boolean", example: true },
                  },
                },
              },
            },
          },
          404: {
            description: "Car not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Error" },
                    message: { type: "string", example: "Car not found" },
                    data: { type: "null" },
                    isError: { type: "boolean", example: true },
                    isSuccess: { type: "boolean", example: false },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
