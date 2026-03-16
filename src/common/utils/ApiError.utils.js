class ApiError extends Error{
    constructor(message, errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}


const apiError = ({message, code}) => {
    throw new ApiError(message, code);
};

export default apiError;