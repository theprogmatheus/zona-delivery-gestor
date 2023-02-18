import SettingsHandler from './../SettingsHandler';

class RestaurantsSettingsHandler extends SettingsHandler {

    constructor(api) {
        super(api);
    }

    async handle(values) {

        let options = [
            {
                value: "",
                label: "Nenhum"
            }
        ]

        const restaurants = await this.api.requests.listRestaurants();

        if (restaurants) {
            restaurants.forEach((restaurant) => {
                options.push(
                    {
                        value: restaurant.id,
                        label: restaurant.displayName
                    }
                )
            })
        }
        console.log(values)

        values.restaurant.values.id.options = options;

        return values;
    }

}

export default RestaurantsSettingsHandler;