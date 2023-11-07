import { brandActionType } from '../../constants/allActions'

export const brandReducer = (state = {}, action) => {
    switch (action.type) {
        case brandActionType.CREATE_BRAND:
            return { ...state, payload: action.payload }
        case brandActionType.FETCH_ALL_BRANDS:
            return { ...state, payload: action.payload }
        case brandActionType.FETCH_BY_CATEGORY:
            return { ...state, payload: action.payload }
        default:
            return state;
    }
}
