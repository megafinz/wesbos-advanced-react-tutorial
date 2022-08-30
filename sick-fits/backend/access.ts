import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((x) => [
    x,
    function ({ session }: ListAccessArgs): boolean {
      return !!session?.data.role?.[x];
    },
  ])
);

export const permissions = {
  ...generatedPermissions,
};

export const rules = {
  canManageProducts(
    this: void,
    { session }: ListAccessArgs
  ): boolean | { user: { id: string } } {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return { user: { id: session.itemId } };
  },
  canReadProducts(
    this: void,
    { session }: ListAccessArgs
  ): boolean | { status: 'AVAILABLE' } {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManagerProducts({ session })) {
      return true;
    }
    return { status: 'AVAILABLE' };
  },
  canManageOrder(
    this: void,
    { session }: ListAccessArgs
  ): boolean | { user: { id: string } } {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { user: { id: session.itemId } };
  },
  canManageOrderItems(
    this: void,
    { session }: ListAccessArgs
  ): boolean | { order: { user: { id: string } } } {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { order: { user: { id: session.itemId } } };
  },
  canManageUsers(
    this: void,
    { session }: ListAccessArgs
  ): boolean | { id: string } {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    return { id: session.itemId };
  },
};
