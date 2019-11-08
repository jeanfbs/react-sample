export const Types = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
};

const initialState = {
    isLoggedIn: false,
    token: null,
    user: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
                user: action.user
            };
        case Types.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                user: null
            };
        default:
            return state;
    }
}

export const authActions = {
    loginAction: (token, user) => {
        return {
            type: Types.LOGIN,
            token,
            user
        }
    }
};

