import { errorResponsehandler, successResponseHandler } from 'app/helpers/responseHandler'
import { actionType, messages } from '../../constants/allActions'
import axios from 'axios'


export const fetchUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3003/user/users', {
                headers: {
                    "env": "test"
                }
            })
            if (data.length > 0) {
                dispatch({
                    type: actionType.FETCH_USERS_DATA,
                    payload: data
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: actionType.ERROR_MESSAGE,
                payload: error
            })
        }
    }
}

export const registerAdmin = (admin) => {
    const { name, email, password } = admin
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3003/admin/register', { name, email, password }, { headers: { env: "test" } })

            if (data) {
                dispatch({
                    type: actionType.CREATE_USER,
                    payload: data
                })
                return successResponseHandler(messages.ADMIN_CREATED, data)
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: actionType.ERROR_MESSAGE,
                payload: error
            })
            return errorResponsehandler(error.message, error)
        }
    }
}

export const signinAdmin = (admin) => {
    const { email, password } = admin
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3003/admin/login', { email, password }, { headers: { env: "test" } })
            dispatch({
                type: actionType.SIGNIN_ADMIN,
                payload: data
            })
            return successResponseHandler(messages.ADMIN_LOGIN, data)
        } catch (error) {

        }
    }
}