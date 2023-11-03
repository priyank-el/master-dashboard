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
                console.log("data is found here -> ", data);
                return successResponseHandler(messages.ADMIN_CREATED, data)
            }
        } catch (error) {
            return errorResponsehandler(actionType.ERROR_MESSAGE, error)
        }
    }
}

export const signinAdmin = (admin) => {
    const { email, password } = admin
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3003/admin/login', { email, password }, { headers: { env: "test" } })
            console.log("data comes");
            dispatch({
                type: actionType.SIGNIN_ADMIN,
                payload: data
            })
            return successResponseHandler(messages.ADMIN_LOGIN, data)
        } catch (error) {
            console.log("error comes");
            return errorResponsehandler(error.response.data.error, error)
        }
    }
}

export const sendOtpInEmail = (object) => {
    const { email, type, otp } = object
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3003/admin/forgot-password', { email: email, type, otp }, { headers: { env: "test" } })
            if (data) {
                // console.log("data is -> ", data)
                dispatch({
                    type: actionType.SEND_OTP,
                    payload: data
                })
                return successResponseHandler(data.message, data)
            }
        } catch (error) {
            console.log("error is -> ", error)
            return errorResponsehandler(error, error)
        }
    }
}

export const resetPassword = (object) => {
    const { email, newPassword } = object
    return async (dispatch) => {
        try {
            const { data } = await axios.put('http://localhost:3003/admin/reset-password', { email, newPassword }, { headers: { env: "test" } })
            if (data) {
                dispatch({
                    type: actionType.RESET_PASSWORD,
                    payload: data
                })
                return successResponseHandler(actionType.RESET_PASSWORD, data)
            }
        } catch (error) {
            return errorResponsehandler(actionType.ERROR_MESSAGE, error)
        }
    }
}

export const getProfileData = () => {
    return async (dispatch) => {
        try {
            // debugger
            const { data } = await axios.get('http://localhost:3003/admin/profile', {
                headers: {
                    "env": "test",
                    "Authorization": localStorage.getItem("JwtToken")
                }
            })
            if (data) {
                dispatch({
                    type: actionType.GET_PROFILE,
                    payload: data
                })
                return successResponseHandler("fetch userdata", data)
            }
        } catch (error) {
            return errorResponsehandler(error.message, error)
        }
    }
}

export const updateAdminProfileData = (objectData) => {
    const { name, email, mobile, address, image } = objectData

    return async (dispatch) => {
        try {
            const { data } = await axios.put('http://localhost:3003/admin/update-profile', { name, email, mobile, address, image }, { headers: { env: "test", Authorization: localStorage.getItem("JwtToken") } })
            if (data) {
                dispatch({
                    type: actionType.UPDATE_PROFILE,
                    payload: data
                })
                return successResponseHandler(messages.UPDATE_PROFILE, data)
            }
        } catch (error) {
            return errorResponsehandler(actionType.ERROR_MESSAGE, error)
        }
    }
}

export const uploadFile = (formdata) => {
    console.log("formData is -> ", formdata)
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3003/admin/web/uploadImage/admin', formdata, {
                headers: {
                    "env": "test",
                    "Content-Type": "multipart/form-data",
                    "Authorization": localStorage.getItem("JwtToken")
                }
            })
            if (data) {
                dispatch({
                    type: actionType.FILE_UPLOADED,
                    payload: data
                })
                return successResponseHandler(messages.FILE_UPLOADED, data)
            }
        } catch (error) {
            return errorResponsehandler(actionType.ERROR_MESSAGE, error)
            // console.log(error);
        }
    }
}

export const updatePass = (object) => {
    const { oldPass, newPass } = object
    return async (dispatch) => {
        try {
            const { data } = await axios.put('http://localhost:3003/admin/update-pass', { oldPass, newPass }, {
                headers: {
                    "env": "test",
                    "Authorization": localStorage.getItem("JwtToken")
                }
            })

            if (data) {
                dispatch({
                    type: actionType.UPDATE_PASSWORD,
                    payload: data
                })
            }
            return successResponseHandler(messages.UPDATE_PASSWORD, data)
        } catch (error) {
            return errorResponsehandler(actionType.ERROR_MESSAGE, error)
        }
    }

}