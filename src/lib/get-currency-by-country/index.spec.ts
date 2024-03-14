import countryByCurrencyCode from './country-by-currency-code.json';
import { getCurrencyByCountry } from './index';

describe('Country By Currency', () => { 

    it('should always exist', () => {
        expect(countryByCurrencyCode).toMatchSnapshot()
    })
    it('should return an object', () => {
        const result = getCurrencyByCountry('United States')
        expect(result).toStrictEqual({
            country: 'United States',
            currency_code: 'USD'
        })        
    })     
 })
 