export enum UserRole {
  CLIENT = "client",
  ADMIN = "admin",
}

export enum Permission {
  // User Management
  MANAGE_USERS = "manage_users",

  // Basic User Permissions
  VIEW_PROFILE = "view_profile",
  UPDATE_PROFILE = "update_profile",
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.MANAGE_USERS,
    Permission.VIEW_PROFILE,
    Permission.UPDATE_PROFILE,
  ],
  [UserRole.CLIENT]: [Permission.VIEW_PROFILE, Permission.UPDATE_PROFILE],
};

export function hasPermission(
  userRole: UserRole,
  permission: Permission,
): boolean {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) ?? false;
}
