

export const definedMessages = {
    UNKNOWN_ERROR: "Some error occured while processing your request.",
    UNKNOWN_ERROR_TRY_AGAIN: "Some error occured while processing your request, please try again."
}



export const REGEX = {
    PASSWORD: new RegExp(""),
    // WEBSITE: new RegExp("^(https?://)?(www.)?([a-zA-Z0-9-]+.)+[a-zA-Z]{2,}(/)?$")
    // ammar changes
    WEBSITE: new RegExp("^www.[a-zA-Z0-9-]+.com(/)?$")
}


export const DATE_FORMATS = {
    ARTICLE_TABLE: 'MMMM yyyy, EEEE h:mma'
}


const CONSTANTS = {
    REGEX,
    definedMessages,
    DATE_FORMATS
}
export default CONSTANTS
