interface PagesContext {
  request: Request;
  next: () => Promise<Response>;
}

import { handleRouteStatus } from "./route-status";

export const onRequest = (context: PagesContext): Promise<Response> =>
  handleRouteStatus(context.request, context.next);
