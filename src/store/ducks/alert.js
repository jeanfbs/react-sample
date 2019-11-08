export const Types = {
    ALERT_SUCCESS: "ALERT_SUCCESS",
    ALERT_ERROR: "ALERT_ERROR",
    ALERT_WARNING: "ALERT_WARNING",
    CLEAR: 'CLEAR'
};

const initialState = {
    isShowing: false,
    message: null,
    variant: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.ALERT_SUCCESS:
            return {
                isShowing: true,
                message: action.message,
                variant: 'success'
            };
        case Types.ALERT_ERROR:
            return {
                isShowing: true,
                message: action.message,
                variant: 'danger'
            };
        case Types.ALERT_WARNING:
            return {
                isShowing: true,
                message: action.message,
                variant: 'warning'
            };
        case Types.CLEAR:
            return {
                isShowing: false,
                message: null,
                variant: null
            };
        default:
            return state;
    }
}

export const alertActions = {
    alertSuccess: message => ({
        type: Types.ALERT_SUCCESS,
        message
    }),
    alertError: message => ({
        type: Types.ALERT_ERROR,
        message
    }),
    alertWarning: (message) => ({
        type: Types.ALERT_WARNING,
        message
    }),
    alertClean: () => ({
        type: Types.CLEAR
    })
};

