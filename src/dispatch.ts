import { Route } from "OpenApiRouter";
import { handleHello } from "operations/hello";
import { rocketsOneHandler } from "operations/spacex";

export interface Result {
  body?: any;
  status: number;
  headers?: Record<string, string>;
}

export const dispatch = async (route: Route): Promise<Result | null | void> => {
  switch (route.operation.operationId) {
    case "hello":
      return await handleHello(route);
    case "rocketsOne":
      return await rocketsOneHandler(route);
    default:
      return null;
  }
};
