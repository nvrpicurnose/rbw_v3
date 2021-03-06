
// Actions related to auth of landlord
export const AUTH_LANDLORD = "AUTH_LANDLORD"
export const UNAUTH_LANDLORD = "UNAUTH_LANDLORD"
export const AUTH_ERROR = "AUTH_ERROR"
export const FETCH_MESSAGE = "FETCH_MESSAGE"


// Actions related to Facebook (auth of tenant)
export const SET_FB_PROFILE = "SET_FB_PROFILE"


// Actions related to Landlord dashboard actions
export const GET_INITIAL_LANDLORD = "GET_INITIAL_LANDLORD"
export const LOAD_LANDLORD_PROPERTIES = "LOAD_LANDLORD_PROPERTIES"
export const SELECT_LANDLORD_PROPERTY = "SELECT_LANDLORD_PROPERTY"
export const EDIT_LANDLORD_PROPERTY = "EDIT_LANDLORD_PROPERTY"
export const DELETE_LANDLORD_PROPERTY = "DELETE_LANDLORD_PROPERTY"


// Actions related to the tenant
export const SET_TENANT = "SET_TENANT"
export const SET_CITY = "SET_CITY"
export const TOGGLE_ADVANCED_SEARCH = "TOGGLE_ADVANCED_SEARCH"


// Actions related to the mapview and pins
export const DROP_PINS = "DROP_PINS"
export const SELECT_PINS = "SELECT_PINS"
export const BACK_TO_PINS = "BACK_TO_PINS"
export const SET_VIEWMODE = "SET_VIEWMODE"
export const LOAD_FOR_VIEWMODE = "LOAD_FOR_VIEWMODE"
export const STRING_FILTER = "STRING_FILTER"
export const PAN_TO = "PAN_TO"


// Actions related to the popup 
export const TOGGLE_SUBLET_POPUP_TRUE = "TOGGLE_SUBLET_POPUP_TRUE"
export const TOGGLE_LEASE_POPUP_TRUE = "TOGGLE_LEASE_POPUP_TRUE"
export const TOGGLE_POPUP_FALSE = "TOGGLE_POPUP_FALSE"
export const TOGGLE_CONTACT_FORM = "TOGGLE_CONTACT_FORM"
export const IMAGE_POPUP = "IMAGE_POPUP"
export const CLEAR_IMAGE_POPUP = "CLEAR_IMAGE_POPUP"


// Actions related to content to/from database
export const GET_SUBLETS_FROM_DB = "GET_SUBLETS_FROM_DB"
export const GET_LEASES_FROM_DB = "GET_LEASES_FROM_DB"


// Actions related to sublet & lease advanced search
export const SEARCH_SUBLET_RESULTS = "SEARCH_SUBLET_RESULTS"
export const SEARCH_LEASE_RESULTS = "SEARCH_LEASE_RESULTS"
export const SAVE_SUBLET_SEARCH_PARAMS = "SAVE_SUBLET_SEARCH_PARAMS"
export const SAVE_LEASE_SEARCH_PARAMS = "SAVE_LEASE_SEARCH_PARAMS"