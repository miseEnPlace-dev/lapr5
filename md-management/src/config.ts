import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT as string, 10) || 4000,

  planningApiUrl: process.env.PLANNING_API_URL || 'http://127.0.0.1:5000',

  tasksApiUrl: process.env.TASKS_API_URL || 'http://127.0.0.1:7000',

  databaseURL: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test',

  allowedEmailDomains: process.env.ALLOWED_EMAIL_DOMAINS
    ? (JSON.parse(process.env.ALLOWED_EMAIL_DOMAINS as string) as string[])
    : ['gmail.com'],
  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || 'my sakdfho2390asjod$%jl)!sdjas0i secret',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info'
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api'
  },

  /**
   * Array of allowed origin domains for CORS cfg
   */
  cors: process.env.ALLOWED_DOMAINS
    ? (JSON.parse(process.env.ALLOWED_DOMAINS as string) as string[])
    : ['http://localhost:5173', 'http://127.0.0.1:7000']
};
