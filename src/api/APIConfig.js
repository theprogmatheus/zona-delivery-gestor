// API HOST URL
console.log("ENV:", process.env)
const apiUrl = process.env.REACT_ZONA_DELIVERY_API_HOST || "http://localhost:8080"; //https://api-v2.zonadelivery.net
console.log('API HOST: ' + apiUrl)

const endPoints = {

    // AUTH CONTROLLER
    auth: {
        login: {
            path: "/auth/login",
            method: "POST"
        }
    },

    restaurant: {
        list: {
            path: "/restaurant",
            method: "GET"
        },
        customers: {
            list: {
                path: "/restaurant/{0}/customer/list",
                method: "GET"
            },
            find: {
                path: "/restaurant/{0}/customer/{1}",
                method: "GET"
            },
            register: {
                path: "/restaurant/{0}/customer/register",
                method: "POST"
            },
            addresses: {
                path: "/restaurant/{0}/customer/{1}/addresses",
                method: "GET"
            },
            registerAddress: {
                path: "/restaurant/{0}/customer/{1}/address/register",
                method: "POST"
            }
        },
        orders: {
            list: {
                path: "/restaurant/{0}/order/list",
                method: "GET"
            },
            orderDetails: {
                path: "/restaurant/{0}/order/{1}",
                method: "GET"
            },
            confirm: {
                path: "/restaurant/{0}/order/{1}/confirm",
                method: "POST"
            },
            dispatch: {
                path: "/restaurant/{0}/order/{1}/dispatch",
                method: "POST"
            },
            create: {
                path: "/restaurant/{0}/order/create",
                method: "POST"
            },
            ifoodCancellationReasons: {
                path: "/restaurant/{0}/order/{1}/ifood/cancellationReasons",
                method: "GET"
            },
            ifoodRequestCancellation: {
                path: "/restaurant/{0}/order/{1}/ifood/requestCancellation",
                method: "POST"
            },
            ifoodAcceptCancellation: {
                path: "/restaurant/{0}/order/{1}/ifood/acceptCancellation",
                method: "POST"
            },
            ifoodDenyCancellation: {
                path: "/restaurant/{0}/order/{1}/ifood/denyCancellation",
                method: "POST"
            }
        },
        menus: {
            register: {
                path: "/restaurant/{0}/menu/register",
                method: "POST"
            },
            delete: {
                path: "/restaurant/{0}/menu/{1}/delete_menu",
                method: "DELETE"
            },
            registerCategory: {
                path: "/restaurant/{0}/menu/{1}/register_category",
                method: "POST"
            },
            deleteCategory: {
                path: "/restaurant/{0}/menu/{1}/delete_category",
                method: "DELETE"
            },
            registerItem: {
                path: "/restaurant/{0}/menu/{1}/register_item",
                method: "POST"
            },
            deleteItem: {
                path: "/restaurant/{0}/menu/{1}/delete_item",
                method: "DELETE"
            },
            registerAditional: {
                path: "/restaurant/{0}/menu/{1}/register_item_aditional",
                method: "POST"
            },
            deleteAditional: {
                path: "/restaurant/{0}/menu/{1}/delete_aditional",
                method: "DELETE"
            },
            registerOptional: {
                path: "/restaurant/{0}/menu/{1}/register_item_optional",
                method: "POST"
            },
            deleteOptional: {
                path: "/restaurant/{0}/menu/{1}/delete_optional",
                method: "DELETE"
            },
            addItemToCategory: {
                path: "/restaurant/{0}/menu/{1}/add_item_to_category",
                method: "POST"
            },
            addAditionalToItem: {
                path: "/restaurant/{0}/menu/{1}/add_aditional_to_item",
                method: "POST"
            },
            list: {
                path: "/restaurant/{0}/menu/list",
                method: "GET"
            },
            find: {
                path: "/restaurant/{0}/menu/{1}",
                method: "GET"
            },
            categories: {
                path: "/restaurant/{0}/menu/{1}/categories",
                method: "GET"
            },
            items: {
                path: "/restaurant/{0}/menu/{1}/items",
                method: "GET"
            },
        },
        ifood: {
            listMerchants: {
                path: "/restaurant/{0}/ifood/merchants",
                method: "GET"
            },
            merchantStatus: {
                path: "/restaurant/{0}/ifood/merchants/{1}/status",
                method: "GET"
            },
            addMerchant: {
                path: "/restaurant/{0}/ifood/add_merchant",
                method: "POST"
            },
            deleteMerchant: {
                path: "/restaurant/{0}/ifood/delete_merchant",
                method: "DELETE"
            }
        }
    },
    event: {
        polling: {
            path: "/event/{0}/polling",
            method: "GET"
        },
        acknowledgment: {
            path: "/event/{0}/acknowledgment",
            method: "POST"
        }
    },
    utils: {
        geodata: {
            path: "/utils/geodata/?query={0}",
            method: "GET"
        },
        gmaps: {
            distance: {
                path: "/utils/gmaps/distance/?origins={0}&destinations={1}",
                method: "GET"
            }
        }
    }

}
export default { apiUrl, endPoints }