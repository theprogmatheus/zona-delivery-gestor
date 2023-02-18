import config from './APIConfig';


class API {

    constructor() {
        this.url = config.apiUrl;
        this.endPoints = config.endPoints;
        this.requests = {
            login: async (credentials) => await this.sendRequest(this.endPoints.auth.login, { body: JSON.stringify(credentials) }),
            findCustomer: async (restaurantId, customerId, findBy) => await this.sendRequest(this.endPoints.restaurant.customers.find, null, [restaurantId, customerId], (findBy ? `?by=${findBy}` : '')),
            registerCustomer: async (restaurantId, body) => await this.sendRequest(this.endPoints.restaurant.customers.register, { body: JSON.stringify(body) }, [restaurantId]),
            customerAddresses: async (restaurantId, customerId) => await this.sendRequest(this.endPoints.restaurant.customers.addresses, null, [restaurantId, customerId]),
            registerCustomerAddress: async (restaurantId, customerId, address) => await this.sendRequest(this.endPoints.restaurant.customers.registerAddress, { body: JSON.stringify(address) }, [restaurantId, customerId]),
            listOrders: async (restaurantId) => await this.sendRequest(this.endPoints.restaurant.orders.list, null, [restaurantId]),
            createOrder: async (restaurantId, order) => await this.sendRequest(this.endPoints.restaurant.orders.create, { body: JSON.stringify(order) }, [restaurantId]),
            getOrderDetails: async (restaurantId, orderId) => await this.sendRequest(this.endPoints.restaurant.orders.orderDetails, null, [restaurantId, orderId]),
            confirmOrder: async (restaurantId, orderId) => await this.sendRequest(this.endPoints.restaurant.orders.confirm, null, [restaurantId, orderId]),
            dispatchOrder: async (restaurantId, orderId) => await this.sendRequest(this.endPoints.restaurant.orders.dispatch, null, [restaurantId, orderId]),
            ifoodCancellationReasons: async (restaurantId, orderId) => await this.sendRequest(this.endPoints.restaurant.orders.ifoodCancellationReasons, null, [restaurantId, orderId]),
            ifoodRequestCancellation: async (restaurantId, orderId, reason, cancellationCode) => await this.sendRequest(this.endPoints.restaurant.orders.ifoodRequestCancellation, { body: JSON.stringify({ reason, cancellationCode }) }, [restaurantId, orderId]),
            ifoodAcceptCancellation: async (restaurantId, orderId) => await this.sendRequest(this.endPoints.restaurant.orders.ifoodAcceptCancellation, null, [restaurantId, orderId]),
            ifoodDenyCancellation: async (restaurantId, orderId) => await this.sendRequest(this.endPoints.restaurant.orders.ifoodDenyCancellation, null, [restaurantId, orderId]),
            eventPolling: async (restaurantId) => await this.sendRequest(this.endPoints.event.polling, null, [restaurantId]),
            eventAcknowledgment: async (restaurantId, events) => await this.sendRequest(this.endPoints.event.acknowledgment, { body: JSON.stringify(events) }, [restaurantId]),
            listRestaurants: async () => await this.sendRequest(this.endPoints.restaurant.list, null, []),
            registerMenu: async (restaurantId, name) => await this.sendRequest(this.endPoints.restaurant.menus.register, { body: JSON.stringify({ name }) }, [restaurantId]),
            deleteMenu: async (restaurantId, menuId) => await this.sendRequest(this.endPoints.restaurant.menus.delete, { body: JSON.stringify({ menu: menuId }) }, [restaurantId, menuId]),
            registerMenuCategory: async (restaurantId, menuId, name) => await this.sendRequest(this.endPoints.restaurant.menus.registerCategory, { body: JSON.stringify({ name }) }, [restaurantId, menuId]),
            deleteMenuCategory: async (restaurantId, menuId, categoryId) => await this.sendRequest(this.endPoints.restaurant.menus.deleteCategory, { body: JSON.stringify({ category: categoryId }) }, [restaurantId, menuId]),
            registerMenuItem: async (restaurantId, menuId, name, description, price, image) => await this.sendRequest(this.endPoints.restaurant.menus.registerItem, { body: JSON.stringify({ name, description, price, image }) }, [restaurantId, menuId]),
            deleteMenuItem: async (restaurantId, menuId, itemId) => await this.sendRequest(this.endPoints.restaurant.menus.deleteItem, { body: JSON.stringify({ item: itemId }) }, [restaurantId, menuId]),
            registerMenuAditional: async (restaurantId, menuId, name, description, price, minAmount, maxAmount) => await this.sendRequest(this.endPoints.restaurant.menus.registerAditional, { body: JSON.stringify({ name, description, price, minAmount, maxAmount }) }, [restaurantId, menuId]),
            deleteMenuAditional: async (restaurantId, menuId, aditionalId) => await this.sendRequest(this.endPoints.restaurant.menus.deleteAditional, { body: JSON.stringify({ aditional: aditionalId }) }, [restaurantId, menuId]),
            addMenuItemToCategory: async (restaurantId, menuId, itemId, categoryId) => await this.sendRequest(this.endPoints.restaurant.menus.addItemToCategory, { body: JSON.stringify({ item: itemId, category: categoryId }) }, [restaurantId, menuId]),
            addMenuAditionalToItem: async (restaurantId, menuId, aditionalId, itemId) => await this.sendRequest(this.endPoints.restaurant.menus.addAditionalToItem, { body: JSON.stringify({ item: itemId, aditional: aditionalId }) }, [restaurantId, menuId]),
            listMenuCategories: async (restaurantId, menuId) => await this.sendRequest(this.endPoints.restaurant.menus.categories, null, [restaurantId, menuId]),
            listMenus: async (restaurantId) => await this.sendRequest(this.endPoints.restaurant.menus.list, null, [restaurantId]),
            findMenu: async (restaurantId, menuId) => await this.sendRequest(this.endPoints.restaurant.menus.find, null, [restaurantId, menuId]),
            geoData: async (latitude, longitude) => await this.sendRequest(this.endPoints.utils.geodata, null, [`${latitude},${longitude}`]),
            gmapDistance: async (origins, destinations) => await this.sendRequest(this.endPoints.utils.gmaps.distance, null, [origins, destinations]),
            listIFoodMerchants: async (restaurantId) => await this.sendRequest(this.endPoints.restaurant.ifood.listMerchants, null, [restaurantId]),
            getIFoodMerchantStatus: async (restaurantId, merchantId) => await this.sendRequest(this.endPoints.restaurant.ifood.merchantStatus, null, [restaurantId, merchantId])
        }
    }

    async authenticate(credentials) {
        const result = await this.requests.login(credentials);

        if (result) {
            return this.setAuthenticationToken({
                ...result,
                authenticatedAt: Date.now()
            })
        }
    }

    logout() {
        if (this.isAuthenticated())
            localStorage.removeItem('authenticationToken');
    }

    isAuthenticated() {
        const authenticationToken = this.getAuthenticationToken();
        return (authenticationToken && (Date.now() < (authenticationToken.authenticatedAt + (authenticationToken.expireIn * 1000) - 10000)));
    }

    setAuthenticationToken(authenticationToken) {
        localStorage.setItem('authenticationToken', JSON.stringify(authenticationToken));
        return this.getAuthenticationToken();
    }

    getAuthenticationToken() {
        const authenticationToken = localStorage.getItem('authenticationToken');
        if (authenticationToken)
            return JSON.parse(authenticationToken);
    }

    async sendRequest(endPoint, configuration, pathVariables = [], extraPath = "", returnEntireResponse = false) {
        try {
            if (this.isAuthenticated() || endPoint === this.endPoints.auth.login) {
                let path = endPoint.path;

                for (let i = 0; i < pathVariables.length; i++)
                    path = path.replace(`{${i}}`, pathVariables[i]);

                const requestURL = `${this.url}${path}${extraPath}`;

                console.log("APIURL: " + this.url)


                const headers = {}
                headers['Content-Type'] = 'application/json';
                if (this.isAuthenticated())
                    headers['Authorization'] = `Bearer ${this.getAuthenticationToken().accessToken}`

                let requestConfiguration = {
                    method: endPoint.method,
                    headers,
                }

                if (configuration) {
                    requestConfiguration = {
                        ...requestConfiguration,
                        ...configuration
                    }
                }
                const response = await fetch(requestURL, requestConfiguration);

                if (returnEntireResponse)
                    return response;

                if (response.ok) {
                    const responseContent = await response.text();

                    if (responseContent.length > 0) {
                        try {
                            return JSON.parse(responseContent);
                        } catch (error) {
                            return null;
                        }
                    }
                }

            }
        } catch (error) {
            console.error("An error has occurred", error);
        }
    }


}
export default API;