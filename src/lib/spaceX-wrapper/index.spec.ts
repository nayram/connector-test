import nock from "nock";
import { getRocketMockRequest, getRocketData } from "tests-utils";
import { getRocketById } from ".";

describe("SpaceX Wrapper", () => {
  let spacexScope: nock.Scope;
  const rocketId = "5f9e50ee-a0e7-4f3a-bdb5-6a0b8df68b03";
  describe("getRocketById", () => {
    describe("success", () => {
      const mockResponseData = getRocketData();
      beforeEach(async () => {
        const statusCode = 200;
        spacexScope = getRocketMockRequest(
          rocketId,
          statusCode,
          mockResponseData,
        );
      });
      it("should call the spacex api successfully", async () => {
        await getRocketById(rocketId);
        expect(spacexScope.isDone()).toBe(true);
      });

      it("should return a rocket response object", async () => {
        const response = await getRocketById(rocketId);
        expect(response).toStrictEqual(mockResponseData);
        expect(response).toHaveProperty("height");
        expect(response).toHaveProperty("diameter");
        expect(response).toHaveProperty("mass");
        expect(response).toHaveProperty("first_stage");
        expect(response).toHaveProperty("second_stage");
        expect(response).toHaveProperty("engines");
        expect(response).toHaveProperty("landing_legs");
        expect(response).toHaveProperty("payload_weights");
        expect(response).toHaveProperty("flickr_images");
        expect(response).toHaveProperty("name");
        expect(response).toHaveProperty("type");
        expect(response).toHaveProperty("active");
        expect(response).toHaveProperty("stages");
        expect(response).toHaveProperty("boosters");
        expect(response).toHaveProperty("cost_per_launch");
        expect(response).toHaveProperty("success_rate_pct");
        expect(response).toHaveProperty("first_flight");
        expect(response).toHaveProperty("country");
        expect(response).toHaveProperty("company");
        expect(response).toHaveProperty("wikipedia");
        expect(response).toHaveProperty("description");
        expect(response).toHaveProperty("id");
      });
    });

    describe("failure", () => {
      it("should throw an error if the api call fails", () => {
        spacexScope = getRocketMockRequest(rocketId, 500);
        return expect(getRocketById(rocketId)).rejects.toThrowError(
          "Request failed with status code 500",
        );
      });
    });
  });
});
