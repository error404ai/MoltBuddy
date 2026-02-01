export enum UserRole {
  CLIENT = "client",
  ADMIN = "admin",
}

export enum Permission {
  // User Management
  MANAGE_USERS = "manage_users",

  // Project Management
  VIEW_ALL_PROJECTS = "view_all_projects",
  VIEW_OWN_PROJECTS = "view_own_projects",
  CREATE_PROJECTS = "create_projects",
  UPDATE_PROJECT_DETAILS = "update_project_details",
  UPDATE_PROJECT_ADVANCED = "update_project_advanced",
  DELETE_PROJECTS = "delete_projects",
  CREATE_PROJECT_UPDATES = "create_project_updates",
  VIEW_PROJECT_UPDATES = "view_project_updates",
  UPDATE_PROJECT_UPDATES = "update_project_updates",
  DELETE_PROJECT_UPDATES = "delete_project_updates",
  SEND_PROJECT_UPDATE_EMAIL = "send_project_update_email",
  SEND_PROJECT_UPDATE_WHATSAPP = "send_project_update_whatsapp",

  // Credential Management
  VIEW_ALL_CREDENTIALS = "view_all_credentials",
  VIEW_OWN_CREDENTIALS = "view_own_credentials",
  CREATE_CREDENTIALS = "create_credentials",
  UPDATE_CREDENTIALS = "update_credentials",
  DELETE_CREDENTIALS = "delete_credentials",

  // Order Management
  VIEW_ALL_ORDERS = "view_all_orders",
  VIEW_OWN_ORDERS = "view_own_orders",
  CREATE_ORDERS = "create_orders",
  UPDATE_ORDER_DETAILS = "update_order_details",
  UPDATE_ORDER_ADVANCED = "update_order_advanced",
  UPDATE_ORDER_STATUS = "update_order_status",
  DELETE_ORDERS = "delete_orders",
  CREATE_ORDERS_FROM_UPDATES = "create_orders_from_updates",

  // Organization Management
  MANAGE_ORGANIZATION = "manage_organization",

  // Mail Management
  MANAGE_MAIL_SETTINGS = "manage_mail_settings",
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.MANAGE_USERS,
    Permission.VIEW_ALL_PROJECTS,
    Permission.VIEW_OWN_PROJECTS,
    Permission.CREATE_PROJECTS,
    Permission.UPDATE_PROJECT_DETAILS,
    Permission.UPDATE_PROJECT_ADVANCED,
    Permission.DELETE_PROJECTS,
    Permission.CREATE_PROJECT_UPDATES,
    Permission.VIEW_PROJECT_UPDATES,
    Permission.UPDATE_PROJECT_UPDATES,
    Permission.DELETE_PROJECT_UPDATES,
    Permission.SEND_PROJECT_UPDATE_EMAIL,
    Permission.SEND_PROJECT_UPDATE_WHATSAPP,
    Permission.VIEW_ALL_CREDENTIALS,
    Permission.VIEW_OWN_CREDENTIALS,
    Permission.CREATE_CREDENTIALS,
    Permission.UPDATE_CREDENTIALS,
    Permission.DELETE_CREDENTIALS,
    Permission.VIEW_ALL_ORDERS,
    Permission.VIEW_OWN_ORDERS,
    Permission.CREATE_ORDERS,
    Permission.UPDATE_ORDER_DETAILS,
    Permission.UPDATE_ORDER_ADVANCED,
    Permission.UPDATE_ORDER_STATUS,
    Permission.DELETE_ORDERS,
    Permission.MANAGE_ORGANIZATION,
    Permission.CREATE_ORDERS_FROM_UPDATES,
    Permission.MANAGE_MAIL_SETTINGS,
  ],
  [UserRole.CLIENT]: [
    Permission.VIEW_OWN_PROJECTS,
    Permission.CREATE_PROJECTS,
    Permission.UPDATE_PROJECT_DETAILS,
    Permission.VIEW_PROJECT_UPDATES,
    Permission.VIEW_OWN_CREDENTIALS,
    Permission.CREATE_CREDENTIALS,
    Permission.UPDATE_CREDENTIALS,
    Permission.DELETE_CREDENTIALS,
    Permission.VIEW_OWN_ORDERS,
    Permission.CREATE_ORDERS,
    Permission.UPDATE_ORDER_DETAILS,
  ],
};

export function hasPermission(
  userRole: UserRole,
  permission: Permission
): boolean {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) ?? false;
}
