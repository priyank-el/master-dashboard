import { actionType } from '../../constants/allActions'

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.FETCH_USERS_DATA:
            return {
                ...state,
                payload: action.payload
            }
        case actionType.CREATE_USER:
            return {
                ...state,
                payload: action.payload
            }
        case actionType.SIGNIN_ADMIN:
            return {
                ...state,
                payload: action.payload
            }
        case actionType.SEND_OTP:
            return {
                ...state,
                payload: action.payload
            }
        case actionType.RESET_PASSWORD:
            return {
                ...state,
                payload: action.payload
            }
        case actionType.FILE_UPLOADED:
            return {
                ...state,
                payload: action.payload
            }
        case actionType.ERROR_MESSAGE:
            return {
                state: { success: false },
                payload: action.payload
            }
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