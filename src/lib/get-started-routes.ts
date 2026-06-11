export const GUEST_GET_STARTED_ROUTE = "/login";
export const AUTHENTICATED_GET_STARTED_ROUTE = "/order/management";

export function getStartedRoute(isAuthenticated: boolean) {
  return isAuthenticated
    ? AUTHENTICATED_GET_STARTED_ROUTE
    : GUEST_GET_STARTED_ROUTE;
}
