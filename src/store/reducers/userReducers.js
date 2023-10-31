import { actionType } from '../../constants/allActions'

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.FETCH_USERS_DATA:
            return {
                ...state,
                payload: action.payload
            }
        // case actionType.CREATE_USER:
        //     return {
        //         ...state,
        //         payload: action.payload
        //     }
        // case actionType.UPDATE_USER:
        //     return {
        //         ...state,
        //         payload: action.payload
        //     }
        // case actionType.DELETE_USER:
        //     return {
        //         ...state,
        //         payload: action.payload
        //     }

        default:
            return state
    }
}

export default userReducer