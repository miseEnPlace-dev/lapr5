import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'MD Management API',
    description: 'Master Data Management API'
  },
  host: 'localhost:4000',
  basePath: '/api',
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    Building: {
      id: 1,
      name: 'Building 1',
      description: 'Building 1',
      maxDimensions: {
        width: 100,
        length: 100
      }
    },
    Elevator: {
      code: 12,
      floorCodes: ['1', '2', '3'],
      brand: 'Brand 1',
      model: 'Model 1',
      serialNumber: '123456789',
      description: 'Elevator 1'
    },
    DeviceModel: {
      code: '123',
      brand: 'Brand 1',
      name: 'Model 1',
      type: 'robot',
      capabilities: ['pick_delivery']
    }
  }
};

const outputFile = './api-doc.json';
const routes = [
  './src/api/routes/buildingRoute.ts',
  './src/api/routes/floorRoute.ts',
  './src/api/routes/elevatorRoute.ts',
  './src/api/routes/connectorRoute.ts',
  './src/api/routes/roomRoute.ts',
  './src/api/routes/deviceModelRoute.ts',
  './src/api/routes/deviceRoute.ts',
  './src/api/routes/roleRoute.ts',
  './src/api/routes/userRoute.ts'
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

export default swaggerAutogen({
  autoSchema: true,
  autoQuery: true,
  autoHeaders: true
})(outputFile, routes, doc);
