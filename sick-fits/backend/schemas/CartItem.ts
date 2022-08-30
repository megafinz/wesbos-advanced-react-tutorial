import { integer, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const CartItem = list({
  access: {
    create: isSignedIn,
    read: rules.canManageOrder,
    update: rules.canManageOrder,
    delete: rules.canManageOrder,
  },
  fields: {
    // TODO: custom label
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.cart' }),
  },
  ui: {
    listView: { initialColumns: ['product', 'quantity', 'user'] },
  },
});
