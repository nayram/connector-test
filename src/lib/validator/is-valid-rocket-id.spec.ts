import { isValidRocketId } from "./is-valid-rocket-id";

describe("Rocket Id Validator", () => {
  it("should return a rocket id", () => {
    const rocketId = "5e9d0d95eda69973a809d1ec";
    expect(isValidRocketId(rocketId)).toBe(true);
  });
  it("should throw an error if rocket id is not valid", () => {
    const rocketId = "12345678";
    expect(() => isValidRocketId(rocketId)).toThrow("Invalid Rocket Id");
  });
});
