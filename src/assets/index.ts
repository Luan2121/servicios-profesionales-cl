import ErrorIcon from './icons/error';
import SuccessIcon from './icons/success';

const Assets = {
    images: {
        bg1: require("./images/bg1.png"),
        fullLogo: require("./images/logo-full.png"),
        plumber: require("./images/plumber.png"),
        electricity: require("./images/electricity.png"),
        heating: require("./images/heating.png"),
        inspection: require("./images/inspection.png"),
        ductopia: require("./images/ductopia.png"),
        techumbre: require("./images/techumbre.png"),
        gasfiter: require("./images/gasfiter.png"),
        cleaning: require("./images/cleaning.png"),
        construction: require("./images/construction.png")
    },
    flags: {
        chile: require('./flags/212-chile.svg')
    },
    icons: {
        error: ErrorIcon,
        success: SuccessIcon
    }
};

export { Assets };