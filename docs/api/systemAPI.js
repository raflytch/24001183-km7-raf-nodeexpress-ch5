module.exports = {
  paths: {
    "/health-check": {
      get: {
        summary: "Health check of the application",
        tags: ["System API"],
        responses: {
          200: {
            description: "Successful health check",
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
                      example: "Application passed health check",
                    },
                    data: {
                      type: "null",
                    },
                    isError: {
                      type: "boolean",
                      example: false,
                    },
                    isSuccess: {
                      type: "boolean",
                      example: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/onlost": {
      get: {
        summary: "Check for non-existent API resource",
        tags: ["System API"],
        responses: {
          404: {
            description: "API Resource not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "Error",
                    },
                    message: {
                      type: "string",
                      example: "API Resource not found",
                    },
                    data: {
                      type: "null",
                    },
                    isError: {
                      type: "boolean",
                      example: true,
                    },
                    isSuccess: {
                      type: "boolean",
                      example: false,
                    },
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
