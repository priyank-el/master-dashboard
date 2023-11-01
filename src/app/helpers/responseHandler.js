export const successResponseHandler = (message, data) => {
    return {
        success: true,
        message,
        data
    }
}

export const errorResponsehandler = (message, error) => {
    return {
        success: false,
        message,
        error
    }
}