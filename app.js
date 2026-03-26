const express = require('express');
const cors = require('cors');
const fournisseurRoutes = require('./routes/fournisseur');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// JSON parsing w limit kbira l images Base64
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Swagger setup
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
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api', fournisseurRoutes);

// Start server
app.listen(5000, () => {
  console.log('Fournisseur microservice running on port 5000');
});