import { Action } from "routing-controllers";

interface UserPayload {
  userId: number;
  email: string;
  role?: string;
}

// Placeholder authorization checker - customize based on your needs
export function authorizationChecker(action: Action, roles: string[]): boolean {
  const authHeader = action.request.headers["authorization"];

  if (!authHeader) {
    return false;
  }

  // TODO: Implement your JWT verification logic here
  // Example:
  // const token = authHeader.replace('Bearer ', '');
  // const payload = verifyJWT(token);
  // action.request.user = payload;

  // For now, return false to require authentication
  return false;
}

// Placeholder current user checker - customize based on your needs
export function currentUserChecker(action: Action): UserPayload | undefined {
  const authHeader = action.request.headers["authorization"];

  if (!authHeader) {
    return undefined;
  }

  // TODO: Implement your JWT verification logic here
  // Example:
  // const token = authHeader.replace('Bearer ', '');
  // const payload = verifyJWT(token);
  // return payload;

  return undefined;
}
