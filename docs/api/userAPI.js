// userAPI.js
module.exports = {
  paths: {
    "/users": {
      get: {
        summary: "Get all users",
        tags: ["Users API"],
        description:
          "Retrieve a list of all users from the database. Requires a valid token.",
        operationId: "getUsers",
        parameters: [
          {
            name: "name",
            in: "query",
            required: false,
            description: "Filter users by name",
            schema: {
              type: "string",
            },
          },
          {
            name: "age",
            in: "query",
            required: false,
            description: "Filter users by age",
            schema: {
              type: "number",
            },
          },
          {
            name: "role",
            in: "query",
            required: false,
            description: "Filter users by role",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: {
                      type: "object",
                      properties: {
                        users: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "integer" },
                              name: { type: "string" },
                              age: { type: "integer" },
                              address: { type: "string" },
                              role: { type: "string" },
                              createdAt: {
                                type: "string",
                                format: "date-time",
                              },
                              updatedAt: {
                                type: "string",
                                format: "date-time",
                              },
                              Auth: {
                                type: "object",
                                properties: {
                                  id: { type: "integer" },
                                  email: { type: "string", format: "email" },
                                },
                              },
                            },
                          },
                        },
                        totalData: { type: "integer" },
                        totalPage: { type: "integer" },
                        nextPage: { type: "integer" },
                        prevPage: { type: "integer" },
                      },
                    },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized access due to missing token",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          token: { type: "string", nullable: true },
                          data: { type: "object", nullable: true },
                        },
                      },
                    },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Users API"],
        summary: "Create a new user",
        description: "Create a new user in the system. Requires a valid token.",
        operationId: "createUser",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string" },
                  address: { type: "string" },
                  age: { type: "integer" },
                },
                required: ["username", "email", "password", "address", "age"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        role: { type: "string" },
                        age: { type: "integer" },
                        address: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                      },
                    },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized access due to missing token",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          token: { type: "string", nullable: true },
                          data: { type: "object", nullable: true },
                        },
                      },
                    },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
          400: {
            description: "Error due to missing required fields",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: { type: "null" },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        summary: "Get user by ID",
        tags: ["Users API"],
        description: "Retrieve a specific user by ID. Requires a valid token.",
        operationId: "getUserById",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "User ID to retrieve",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "User retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        age: { type: "integer" },
                        address: { type: "string" },
                        role: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                        Auth: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            email: { type: "string", format: "email" },
                          },
                        },
                      },
                    },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized access due to missing token",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          token: { type: "string", nullable: true },
                          data: { type: "object", nullable: true },
                        },
                      },
                    },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: { type: "null" },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Users API"],
        summary: "Update user by ID",
        description: "Update a specific user by ID. Requires a valid token.",
        operationId: "updateUser",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "User ID to update",
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  address: { type: "string" },
                  role: { type: "string" },
                },
                required: ["name", "address", "role"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "User updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: {
                      type: "object",
                      properties: {
                        updatedUser: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                            address: { type: "string" },
                            role: { type: "string" },
                            updatedAt: { type: "string", format: "date-time" },
                          },
                        },
                      },
                    },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized access due to missing token",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          token: { type: "string", nullable: true },
                          data: { type: "object", nullable: true },
                        },
                      },
                    },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
          400: {
            description: "Error due to missing required fields",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: { type: "null" },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: { type: "null" },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Users API"],
        summary: "Delete user by ID",
        description: "Delete a specific user by ID. Requires a valid token.",
        operationId: "deleteUser",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "User ID to delete",
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: { type: "null" },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized access due to missing token",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          token: { type: "string", nullable: true },
                          data: { type: "object", nullable: true },
                        },
                      },
                    },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
                  },
                },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                    data: { type: "null" },
                    isError: { type: "boolean" },
                    isSuccess: { type: "boolean" },
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
