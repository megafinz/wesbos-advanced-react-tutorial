import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { sendPasswordResetEmail } from './lib/mail';
import { insertSeedData } from './seed-data';
import { extendGraphqlSchema } from './mutations';

import 'dotenv/config';

const dbUrl =
  process.env.DATABASE_URL ||
  'mongodb://localhost:27010/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long user will stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: add initial roles
  },
  passwordResetLink: {
    async sendToken(args) {
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: dbUrl,
      onConnect: async (ks) => {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(ks);
        }
      },
    },
    lists: createSchema({
      User,
      Product,
      ProductImage,
      CartItem,
    }),
    extendGraphqlSchema,
    ui: {
      // TODO: change this for roles
      isAccessAllowed: ({ session }) =>
        session && Object.keys(session).includes('data'),
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);
