import dotenv from 'dotenv';

dotenv.config();

const config = {
  jwt: {
    secret: process.env.JWT_SECRET!,
    lifetime: process.env.JWT_LIFETIME!,
  },
  mongodb: {
    uri: process.env.MONGO_URI!,
    local_uri: process.env.MONGO_URI_LOCAL!,
  },
  port: process.env.PORT!,
  node_env: process.env.NODE_ENV!,
} as const;

export default config;
