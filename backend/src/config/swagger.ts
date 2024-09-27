import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Your Project API",
    version: "1.0.0",
    description: "API documentation for VERVE IELTS",
  },
  servers: [
    {
      url: "http://localhost:3000", // Replace with your server URL
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
