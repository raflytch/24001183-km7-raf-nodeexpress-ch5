module.exports = {
  paths: {
    "/auth/register": {
      post: {
        summary: "Register a new user",
        tags: ["Auth API"],
        security: [], // No auth needed for register
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                    example: "Rafly Aziz",
                  },
                  email: {
                    type: "string",
                    example: "raflyaziz@gmail.com",
                  },
                  password: {
                    type: "string",
                    example: "rafly123",
                  },
                  address: {
                    type: "string",
                    example: "Jalan Muara Bahari",
                  },
                  age: {
                    type: "integer",
                    example: 21,
                  },
                },
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
                    status: {
                      type: "string",
                      example: "Success",
                    },
                    message: {
                      type: "string",
                      example: "User created successfully",
                    },
                    data: {
                      type: "object",
                      properties: {
                        newUser: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                            address: { type: "string" },
                            age: { type: "integer" },
                            role: { type: "string" },
                            updatedAt: { type: "string", format: "date-time" },
                            createdAt: { type: "string", format: "date-time" },
                          },
                        },
                        id: { type: "integer" },
                        email: { type: "string" },
                        password: { type: "string" },
                        userId: { type: "integer" },
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
            description: "Error registering user",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Error" },
                    message: {
                      type: "string",
                      example: "Username and password are required",
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
    "/auth/login": {
      post: {
        summary: "Login a user",
        tags: ["Auth API"],
        security: [], // No auth needed for login
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    example: "raflyazizabdillah30@gmail.com",
                  },
                  password: {
                    type: "string",
                    example: "mySecretPassword123",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Success" },
                    message: {
                      type: "string",
                      example: "User logged in successfully",
                    },
                    data: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        email: { type: "string" },
                        userId: { type: "integer" },
                        role: { type: "string" },
                        token: { type: "string" },
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
            description: "Invalid email or password",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Error" },
                    message: {
                      type: "string",
                      example: "Invalid email or password",
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
    "/auth/token": {
      get: {
        summary: "Verify user token",
        tags: ["Auth API"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            in: "header",
            name: "Authorization",
            schema: {
              type: "string",
            },
            required: true,
            description: "JWT token with Bearer prefix",
          },
        ],
        responses: {
          200: {
            description: "Token verified successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "Success" },
                    message: {
                      type: "string",
                      example: "Token verified successfully",
                    },
                    data: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        role: { type: "string" },
                        Auth: {
                          type: "object",
                          properties: {
                            email: { type: "string" },
                          },
                        },
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
    },
  },
};
