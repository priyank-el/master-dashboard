import { categoryActionType } from '../../constants/allActions'

const categoryReducer = (state = {}, action) => {
    switch (action.type) {
        case categoryActionType.CREATE_CATEGORY:
            return {
                ...state,
                payload: action.payload
            }
        case categoryActionType.FETCH_ALL_CATEGORIES:
            return {
                ...state,
                payload: action.payload
            }
        case categoryActionType.FETCH_ALL_CATEGORIES:
            return {
                ...state,
                payload: action.payload
            }
        case categoryActionType.DELETE_CATEGORY:
            return {
                ...state,
                payload: action.payload
            }
        default:
            return state
    }
}

export default categoryReducer