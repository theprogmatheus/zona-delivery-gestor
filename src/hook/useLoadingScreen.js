import { useState, useEffect } from "react";

const LoadingScreenComponent = ({ fullScreen, loadingMessage, loadingGIF }) => {

    const loadScreenStyle = {

        loadScreen: {
            height: fullScreen ? "100vh" : "100%",
            width: fullScreen ? "100vw" : "100%",
            position: fullScreen ? "fixed" : "relative",
            top: 0,
            left: 0,
            background: "rgba(0, 0, 0, .85)"
        },

        loadScreenInfoCard: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: fullScreen ? "fixed" : "absolute",
            width: "100%",
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent"
        },

        loadScreenImage: {
            background: loadingGIF,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            width: "50px",
            height: "50px",
            marginBottom: "20px"
        },

        loadScreenMessage: {
            textAlign: "center",
            color: "#FFF",
            fontSize: "1.3em",
            background: "transparent"
        }
    }

    return (
        <div style={loadScreenStyle.loadScreen}>
            <div style={loadScreenStyle.loadScreenInfoCard} >
                <div style={loadScreenStyle.loadScreenImage} />
                {loadingMessage && <span style={loadScreenStyle.loadScreenMessage}>{loadingMessage}</span>}
            </div>
        </div>
    )
}

const useLoadingScreen = (initalLoading, fullScreen = true, loadmsg = "", loadingGIF = "url('https://www.ign.gob.ar/geodesiaapp/ntrip-registro/img/loader.gif')") => {


    const [loadingMessage, setLoadingMessage] = useState(loadmsg);
    const [loading, setLoading] = useState(initalLoading && initalLoading);
    const [loadingScreen, setLoadingScreen] = useState(<></>);

    useEffect(() => {
        setLoadingScreen(loading ? <LoadingScreenComponent fullScreen={fullScreen} loadingGIF={loadingGIF} loadingMessage={loadingMessage} /> : <></>)


        // eslint-disable-next-line
    }, [loading,loadingMessage])


    return {
        JSX: loadingScreen,
        loading,
        setLoading,
        loadingMessage,
        setLoadingMessage
    }
}

export default useLoadingScreen;