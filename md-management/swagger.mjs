import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'MD Management API',
    description: 'Master Data Management API'
  },
  host: 'localhost:4000'
};

const outputFile = './api-doc.json';
const routes = [
  './src/api/routes/buildingRoute.ts',
  './src/api/routes/roomRoute.ts',
  './src/api/routes/roleRoute.ts',
  './src/api/routes/userRoute.ts',
  './src/api/routes/floorRoute.ts',
  './src/api/routes/elevatorRoute.ts',
  './src/api/routes/deviceRoute.ts',
  './src/api/routes/deviceModelRoute.ts',
  './src/api/routes/connectorRoute.ts'
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

export default swaggerAutogen()(outputFile, routes, doc);
