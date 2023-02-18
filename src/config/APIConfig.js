const APIConfig = () => {

    // API HOST URL
    const apiUrl = "http://localhost:8080";   //process.env.REACT_APP_API_HOST;

    const endPoints = {

        // AUTH CONTROLLER
        auth: {
            login: {
                path: "/auth/login",
                method: "POST"
            }
        },

        restaurant: {
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
                }                
            }
        },
        event: {
            polling: {
                path: "/event/polling",
                method: "GET"
            },
            acknowledgment: {
                path: "/event/acknowledgment",
                method: "POST"
            }
        }

    }

    return { apiUrl, endPoints }
}
export default APIConfig;