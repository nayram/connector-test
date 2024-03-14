import { Result } from "dispatch";
import { Route } from "OpenApiRouter";
import { getRocketById } from "services/spaceX";
import { isValidRocketId } from "lib/validator/is-valid-rocket-id";

const errorHandler = (error: Error) => {
  if (error.name === "SpaceXError") {
    return {
      status: 404,
      body: {
        message: "Rocket not found",
      },
    };
  } else if (error.name === "InValidRocketIdError") {
    return {
      status: 400,
      body: {
        message: "Invalid Rocket Id",
      },
    };
  }
  throw error;
};

export const rocketsOneHandler = async (
  _route: Route,
): Promise<Result | void> => {
  try {
    const rocketId = _route.pathParameters["rocketId"];
    if (isValidRocketId(rocketId)) {
      const rocketDetails = await getRocketById(rocketId);
      return {
        status: 200,
        body: {
          ...rocketDetails,
        },
      };
    }
  } catch (error) {
    return errorHandler(error);
  }
};
