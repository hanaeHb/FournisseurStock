const express = require('express');
const bodyParser = require('body-parser');
const fournisseurRoutes = require('./routes/fournisseur');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
//const eurekaClient = require('./config/eureka-client');

const app = express();
app.use(bodyParser.json());

// CORS pour React frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fournisseur Microservice',
      version: '1.0.0',
      description: 'API pour gérer les fournisseurs'
    },
    servers: [{ url: 'http://localhost:5000/api' }]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', fournisseurRoutes);

// Start server
app.listen(5000, () => {
  console.log('Fournisseur microservice running on port 5000');

  /* Registration with Eureka
  eurekaClient.start(err => {
    if (err) {
      console.error('Eureka registration failed:', err);
    } else {
      console.log('Registered with Eureka');
    }
  });*/
});