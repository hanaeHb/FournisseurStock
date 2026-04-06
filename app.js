const express = require('express');
const cors = require('cors');
const path = require('path');
const Eureka = require('eureka-js-client').Eureka;
const fournisseurRoutes = require('./routes/fournisseur');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = 5000;

// Configuration Eureka
const client = new Eureka({
  instance: {
    app: 'service-fournisseur',

    hostName: 'localhost',

    ipAddr: '127.0.0.1',
    statusPageUrl: `http://localhost:${PORT}/api/info`,
    healthCheckUrl: `http://localhost:${PORT}/health`,

    port: {
      '$': PORT,
      '@enabled': 'true',
    },

    vipAddress: 'service-fournisseur',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/',
  },
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Static Files & Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', fournisseurRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.send({ status: 'UP' });
});

// Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Fournisseur Microservice', version: '1.0.0' },
    servers: [{ url: `http://localhost:${PORT}/api` }]
  },
  apis: ['./routes/*.js']
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
app.listen(PORT, () => {
  console.log(`Fournisseur microservice running on port ${PORT}`);

  client.start((error) => {
    if (error) {
      console.log('Error starting Eureka client:', error);
    } else {
      console.log('Fournisseur service registered with Eureka! ✅');
    }
  });
});