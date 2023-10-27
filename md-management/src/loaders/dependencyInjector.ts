import { Container } from 'typedi';
import LoggerInstance from './logger';

export default ({
  schemas,
  controllers,
  repos,
  services
}: {
  schemas: { name: string; schema: string }[];
  controllers: { name: string; path: string }[];
  repos: { name: string; path: string }[];
  services: { name: string; path: string }[];
}) => {
  try {
    Container.set('logger', LoggerInstance);

    /**
     * We are injecting the mongoose models into the DI container.
     * This is controversial but it will provide a lot of flexibility
     * at the time of writing unit tests.
     */
    schemas.forEach(m => {
      // Notice the require syntax and the '.default'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const schema = require(m.schema).default;
      Container.set(m.name, schema);
    });

    repos.forEach(m => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const repoClass = require(m.path).default;
      const repoInstance = Container.get(repoClass);
      Container.set(m.name, repoInstance);
    });

    services.forEach(m => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const serviceClass = require(m.path).default;
      const serviceInstance = Container.get(serviceClass);
      Container.set(m.name, serviceInstance);
    });

    controllers.forEach(m => {
      // load the @Service() class by its path
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const controllerClass = require(m.path).default;
      // create/get the instance of the @Service() class
      const controllerInstance = Container.get(controllerClass);
      // rename the instance inside the container
      Container.set(m.name, controllerInstance);
    });
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
