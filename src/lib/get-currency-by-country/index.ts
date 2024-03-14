import countryByCurrency from './country-by-currency-code.json';

export const getCurrencyByCountry = (country: string) => {
    return countryByCurrency.find((c) => c.country === country)
}
