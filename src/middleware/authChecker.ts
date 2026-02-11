import { Action } from "routing-controllers";
import { AuthService, JwtPayload } from "../services/AuthService";

const authService = new AuthService();

export function authorizationChecker(action: Action, roles: string[]): boolean {
  const authHeader = action.request.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const payload = authService.verifyToken(token);
    action.request.user = payload;

    if (roles.length > 0 && !roles.includes(payload.type)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function currentUserChecker(action: Action): JwtPayload | undefined {
  const authHeader = action.request.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return undefined;
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    return authService.verifyToken(token);
  } catch {
    return undefined;
  }
}
