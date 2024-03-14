import chalk from 'chalk'
import { getRocketById as getRocket, RocketResponse } from 'lib/spaceX-wrapper'
import { getCurrencyByCountry } from 'lib/get-currency-by-country'

type Rocket = {
    id: string,
    company: string,
    country: string,
    main_image: string,
    cost_per_launch: {
        amount: number,
        currency: string
    },
}

export const spaceXError = new Error()
spaceXError.name = 'SpaceXError'
spaceXError.message = 'Failed to fetch rocket data'

export const getRocketById = async (id: string): Promise<Rocket> => {
    try {
        return transformRocketData(await getRocket(id))
    } catch (error) {
        console.log(
            chalk`{dim ${new Date()
                .toTimeString()
                .substring(0, 8)}} {magenta spaceX} {red ERROR} ${error}`    
        )
        throw spaceXError
    }
    
}

export const transformRocketData = (rocket: RocketResponse): Rocket => {
    const currency = getCurrencyByCountry(rocket.country.replace("Republic of the", "").trim()) 
    return {
        id: rocket.id,
        company: rocket.company,
        country: rocket.country,
        main_image: rocket.flickr_images[0] || '',
        cost_per_launch: {
            amount: rocket.cost_per_launch,
            currency: currency?.currency_code || 'Not available'
        }
    }
}
