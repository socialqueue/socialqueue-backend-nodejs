// 1xx informational
export const INFORMATIONAL = {
    Continue: { code: 100, msg: "Continue" },
    Switching_Protocols: { code: 101, msg: "Switching Protocols" },
    Processing: { code: 102, msg: "Processing" }
}


// 2xx success
export const SUCCESS = {
    OK: { code: 200, msg: "OK" },
    Created: { code: 201, msg: "Created" },
    Accepted: { code: 202, msg: "Accepted" },
    Non_authoritative_Information: { code: 203, msg: "Non-authoritative Information" },
    No_Content: { code: 204, msg: "No Content" },
    Reset_Content: { code: 205, msg: "Reset Content" },
    Partial_Content: { code: 206, msg: "Partial Content" },
    Multi_Status: { code: 207, msg: "Multi-Status" },
    Already_Reported: { code: 208, msg: "Already Reported" },
    IM_Used: { code: 226, msg: "IM Used" }
}


// 3xx redirection
export const REDIRECTION = {
    Multiple_Choices: { code: 300, msg: "Multiple Choices" },
    Moved_Permanently: { code: 301, msg: "Moved Permanently" },
    Found: { code: 302, msg: "Found" },
    See_Other: { code: 303, msg: "See Other" },
    Not_Modified: { code: 304, msg: "Not Modified" },
    Use_Proxy: { code: 305, msg: "Use Proxy" },
    Temporary_Redirect: { code: 307, msg: "Temporary Redirect" },
    Permanent_Redirect: { code: 308, msg: "Permanent Redirect" },
}


// 4xx client error
export const CLIENT_ERROR = {
    Bad_Request: { code: 400, msg: " Bad Request" },
    Unauthorized: { code: 401, msg: " Unauthorized" },
    Payment_Required: { code: 402, msg: " Payment Required" },
    Forbidden: { code: 403, msg: " Forbidden" },
    Not_Found: { code: 404, msg: " Not Found" },
    Method_Not_Allowed: { code: 405, msg: " Method Not Allowed" },
    Not_Acceptable: { code: 406, msg: " Not Acceptable" },
    Proxy_Authentication_Required: { code: 407, msg: " Proxy Authentication Required" },
    Request_Timeout: { code: 408, msg: " Request Timeout" },
    Conflict: { code: 409, msg: " Conflict" },
    Gone: { code: 410, msg: " Gone" },
    Length_Required: { code: 411, msg: " Length Required" },
    Precondition_Failed: { code: 412, msg: " Precondition Failed" },
    Payload_Too_Large: { code: 413, msg: " Payload Too Large" },
    Request_URI_Too_Long: { code: 414, msg: " Request URI Too Long" },
    Unsupported_Media_Type: { code: 415, msg: " Unsupported Media Type" },
    Requested_Range_Not_Satisfiable: { code: 416, msg: " Requested Range Not Satisfiable" },
    Expectation_Failed: { code: 417, msg: " Expectation Failed" },
    Im_a_teapot: { code: 418, msg: " I'm a teapot" },
    Misdirected_Request: { code: 421, msg: " Misdirected Request" },
    Unprocessable_Entity: { code: 422, msg: " Unprocessable Entity" },
    Locked: { code: 423, msg: " Locked" },
    Failed_Dependency: { code: 424, msg: " Failed Dependency" },
    Upgrade_Required: { code: 426, msg: " Upgrade Required" },
    Precondition_Required: { code: 428, msg: " Precondition Required" },
    Too_Many_Requests: { code: 429, msg: " Too Many Requests" },
    Request_Header_Fields_Too_Large: { code: 431, msg: " Request Header Fields Too Large" },
    Connection_Closed_Without_Response: { code: 444, msg: " Connection Closed Without Response" },
    Unavailable_For_Legal_Reasons: { code: 451, msg: " Unavailable For Legal Reasons" },
    Client_Closed_Request: { code: 499, msg: " Client Closed Request" }
}


// 5xx server error
export const SERVER_ERROR = {
    Internal_Server_Error: { code: 500, msg: "Internal Server Error" },
    Not_Implemented: { code: 501, msg: "Not Implemented" },
    Bad_Gateway: { code: 502, msg: "Bad Gateway" },
    Service_Unavailable: { code: 503, msg: "Service Unavailable" },
    Gateway_Timeout: { code: 504, msg: "Gateway Timeout" },
    HTTP_Version_Not_Supported: { code: 505, msg: "HTTP Version Not Supported" },
    Variant_Also_Negotiates: { code: 506, msg: "Variant Also Negotiates" },
    Insufficient_Storage: { code: 507, msg: "Insufficient Storage" },
    Loop_Detected: { code: 508, msg: "Loop Detected" },
    Not_Extended: { code: 510, msg: "Not Extended" },
    Network_Authentication_Required: { code: 511, msg: "Network Authentication Required" },
    Network_Connect_Timeout_Error: { code: 599, msg: "Network Connect Timeout Error" }
}
