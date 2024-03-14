const InValidRocketIdError = new Error();
InValidRocketIdError.name = "InValidRocketIdError";
InValidRocketIdError.message = "Invalid Rocket Id";

const uuidRegex = /^[0-9a-fA-F]{24}$/;
export const isValidRocketId = (rocketId: string) => {
  if (rocketId.match(uuidRegex)) {
    return true;
  }
  throw InValidRocketIdError;
};
