import { Route } from "OpenApiRouter";
import { rocketsOneHandler } from ".";
import { getRocketData, getRocketMockRequest} from 'tests-utils';

describe("SpaceX operation", () => {
  const operationId = "rocketOne";
  describe('Success', () => { 
    const rocketId = '5e9d0d95eda69955f709d1eb'
    const mockResponseData = getRocketData()
    const route: Route = {
      route: "/space/rockets/{rocket-id}",
      operation: {
        operationId,
        responses: {},
      },
      pathParameters: {
        rocketId,
      },
    };
    beforeEach(() => {
      const statusCode = 200
      getRocketMockRequest(rocketId, statusCode, mockResponseData)
    })
  
    it("should return a 200 response", async () => {
      const response = await rocketsOneHandler(route);
      expect(response?.status).toEqual(200);
    });
  
    it('should return a rocket object successfully', async () => {
      const response = await rocketsOneHandler(route);
      expect(response?.body).toHaveProperty('id');
      expect(response?.body).toHaveProperty('company');
      expect(response?.body).toHaveProperty('country');
      expect(response?.body).toHaveProperty('main_image');
      expect(response?.body).toHaveProperty('cost_per_launch');
      expect(response?.body.cost_per_launch).toHaveProperty('amount');
      expect(response?.body.cost_per_launch).toHaveProperty('currency');
    })
  })

  describe('Failure', () => { 

    it('should return a 400 response code if the rocket id is invalid', async () => {
      const rocketId = '1234'
      const route: Route = {
        route: "/space/rockets/{rocket-id}",
        operation: {
          operationId,
          responses: {},
        },
        pathParameters: {
          rocketId,
        },
      };
      const response = await rocketsOneHandler(route);
      expect(response?.status).toEqual(400);
      expect(response?.body.message).toEqual('Invalid Rocket Id');

    })
    it('should throw an error if the rocket does not exist', async () => {
      const rocketId = '5e9d0d95eda69955f709d1ea'
      const route: Route = {
        route: "/space/rockets/{rocket-id}",
        operation: {
          operationId,
          responses: {},
        },
        pathParameters: {
          rocketId,
        },
      };
      getRocketMockRequest(rocketId, 404)
      const response = await rocketsOneHandler(route);
      expect(response?.status).toEqual(404);
      expect(response?.body.message).toEqual('Rocket not found');
    })
  })
});
