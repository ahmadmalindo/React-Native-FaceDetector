const initialState = {
    login: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_LOGIN_DATA':
            return {
                ...state,
                ...action.payload,
                login: action.login,
            };
        case 'LOGGED_OUT' :
            return {
                ...state,
                login: action.login,
                state: []
            };
        default:
            return state
    }
}