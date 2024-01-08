import { EnsureAuthenticatedMiddleware } from "../middlewares/ensure-authenticated.middleware";


export function makeEnsureAuthenticatedMiddleware() {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware();

  return ensureAuthenticatedMiddleware;
}