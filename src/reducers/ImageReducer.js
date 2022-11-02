const initialState = {
    img: [],
    nominal: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'IMAGE_DATA':
            return {
                ...state,
                ...action.payload,
                img: action.img,
            };
            case 'STORE_NOMINAL':
            return {
                ...state,
                ...action.payload,
                nominal: action.nominal,
            };
        default:
            return state
    }
}