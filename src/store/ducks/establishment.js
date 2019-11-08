export const Types = {
    CURRENT: "CURRENT",
    HISTORIC: "HISTORIC",
    CLEAR_HISTORIC: "CLEAR_HISTORIC"
}

const initialState = {
    current: null,
    historic: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.CURRENT:
            return {
                ...state,
                current: action.current
            };
        case Types.HISTORIC:
            return {
                ...state,
                historic: action.historic
            };
        case Types.CLEAR_HISTORIC:
            return {
                ...state,
                historic: []
            };
        default:
            return state;
    }
}

export const establishmentActions = {
    
    setCurrentEc: (current) => {
        return {
            type: Types.CURRENT,
            current
        }
    },

    setHistoric: (historic) => ({
        type: Types.HISTORIC,
        historic
    }),

    clear: () => ({
        type: Types.CLEAR_HISTORIC
    })
}

