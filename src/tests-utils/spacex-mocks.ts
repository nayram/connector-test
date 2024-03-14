import nock from "nock";
const spaceXBaseUrl = "https://api.spacexdata.com/v4";

export const getRocketMockRequest = (
  id: string,
  responseCode: number = 200,
  responseData = {},
) => {
  return nock(spaceXBaseUrl)
    .get(`/rockets/${id}`)
    .reply(responseCode, responseData);
};
