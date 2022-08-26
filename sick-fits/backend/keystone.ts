import { config, createSchema } from '@keystone-next/keystone/schema';

import 'dotenv/config';

const dbUrl =
  process.env.DATABASE_URL ||
  'mongodb://localhost:27010/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long user will stay signed in
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: dbUrl,
    // TODO: add data seeding here
  },
  lists: createSchema({}),
  ui: {
    // TODO: change this for roles
    isAccessAllowed: () => true,
  },
  // TODO: add session values
});
