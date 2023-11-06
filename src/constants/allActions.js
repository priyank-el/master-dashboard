export const actionType = {
    FETCH_USERS_DATA: "FETCH_USERS_DATA",
    CREATE_USER: "CREATE_USER",
    UPDATE_USER: "UPDATE_USER",
    DELETE_USER: "DELETE_USER",
    SIGNIN_ADMIN: "SIGNIN_ADMIN",
    SEND_OTP: "SEND_OTP",
    RESET_PASSWORD: "RESET_PASSWORD",
    UPDATE_PROFILE: "UPDATE_PROFILE",
    FILE_UPLOADED: "FILE_UPLOADED",
    GET_PROFILE: "GET_PROFILE",
    UPDATE_PASSWORD: "UPDATE_PASSWORD",

    // SOME ERROR OCCURS //
    ERROR_MESSAGE: "something went wrong"
}

export const categoryActionType = {
    CREATE_CATEGORY: 'CREATE_CATEGORY',
    FETCH_ALL_CATEGORIES: 'FETCH_ALL_CATEGORIES',
    UPDATE_CATEGORIES: 'UPDATE_CATEGORIES',
    DELETE_CATEGORY: 'DELETE_CATEGORY'
}

export const brandActionType = {
    CREATE_BRAND: 'CREATE_BRAND',
    FETCH_ALL_BRANDS: 'FETCH_ALL_BRANDS',
    UPDATE_BRAND: 'UPDATE_BRAND',
    DELETE_BRAND: 'DELETE_BRAND'
}

export const messages = {
    ADMIN_CREATED: "admin registered successfully",
    ADMIN_LOGIN: "admin login successfully",
    ADMIN_LOGGED_OUT: "admin logged out",
    OTP_SENDED: "otp sended successfully",
    RESET_PASSWORD: "password updated successfully",
    UPDATE_PROFILE: "profile updated successfully",
    FILE_UPLOADED: "file uploaded successfully",
    // GET_PROFILE: ""
    UPDATE_PASSWORD: "password updated successfully"
}

export const IS_LOADING = 'IS_LOADING'