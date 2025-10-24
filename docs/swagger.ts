export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wallet System API',
      version: '1.0.0',
      description: 'A financial wallet system with user authentication and transaction management',
    },
    servers: [
      {
        url: `http://localhost:${process.env["PORT"] || 3000}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/presentation/routes/*.ts'],
};
