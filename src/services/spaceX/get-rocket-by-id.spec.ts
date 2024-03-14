import  { getRocketMockRequest, getRocketData } from '../../tests-utils'
import { getRocketById } from './get-rocket-by-id'

describe('SpaceX Services', () => { 
    const rocketId = '5e9d0d95eda69955f709d1eb'
    describe('getRocketById', () => {
        const mockResponseData = getRocketData()
        describe('success', () => {
            beforeEach(async () => {
                const statusCode = 200
                getRocketMockRequest(rocketId, statusCode, mockResponseData)              
            })
    
            it('should return a rocket object', async () => {
                const rocket = await getRocketById(rocketId)
                expect(rocket).toHaveProperty('id')
                expect(rocket).toHaveProperty('company')
                expect(rocket).toHaveProperty('country')
                expect(rocket).toHaveProperty('main_image')
                expect(rocket).toHaveProperty('cost_per_launch')
                expect(rocket.cost_per_launch).toHaveProperty('amount')
                expect(rocket.cost_per_launch).toHaveProperty('currency')
            })            
        })
        
        describe('failure', () => {
            it('should throw an error', async () => {
                const statusCode = 404
                getRocketMockRequest(rocketId, statusCode, mockResponseData)
                return expect(getRocketById(rocketId)).rejects.toThrowError('Failed to fetch rocket data')
            })
        })
    })   
})
