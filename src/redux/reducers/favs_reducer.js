import { toast } from "react-toastify";
import { ADD_REMOVE_FAVS, fetchFavs, FETCH_FAVS_FAILIER, FETCH_FAVS_REQUEST, FETCH_FAVS_SUCCESS } from "../actions/favs_action";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";


export const initState = {
    items: [],
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