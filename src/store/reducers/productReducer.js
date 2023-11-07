import { productActionType } from "constants/allActions";

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case productActionType.FETCH_ALL_PRODUCTS:
            return { ...state, payload: action.payload }
        case productActionType.UPLOAD_IMAGE:
            return { ...state, payload: action.payload }
        default:
            return state;
    }
}