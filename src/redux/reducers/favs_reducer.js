import {FETCH_FAVS_FAILIER, FETCH_FAVS_REQUEST, FETCH_FAVS_SUCCESS } from "../actions/favs_action";

export const initState = {
    favs: [],
    loading: true,
    error: null
}

export const favsReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_FAVS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_FAVS_SUCCESS:
            return { 
                ...state,
                loading: false,
                favs: action.payload
            }
                
            
        case FETCH_FAVS_FAILIER:
            return {
                loadin: false,
                favs: [],
                err: action.payload
            }
        default:
            return state
    }
}