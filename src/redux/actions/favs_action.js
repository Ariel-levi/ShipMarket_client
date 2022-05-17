import { toast } from "react-toastify";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";

export const FETCH_FAVS_REQUEST = "FETCH_FAVS_REQUEST";
export const FETCH_FAVS_SUCCESS = "FETCH_FAVS_SUCCESS";
export const FETCH_FAVS_FAILIER = "FETCH_FAVS_FAILIER";

const fetchFavsRequst = () => {
    return {
        type: FETCH_FAVS_REQUEST,
    }
}
const fetchFavsSuccess = (items) => {
    return {
        type: FETCH_FAVS_SUCCESS,
        payload: items
    }
}

const fetchFavsFailure = (err) => {

    return {
        type: FETCH_FAVS_FAILIER,
        payload: err
    }
}


export const addRemoveFavs = (_short_id) =>  async (dispatch, getState) => {
        if (localStorage["tok"]) {
            let url = API_URL + "/favs/add_remove/" + _short_id
            try {
                let resp = await doApiMethod(url, "PATCH", {})
                if (resp.data.modifiedCount){
                    console.log(resp.data);
                    if(resp.data.inFavs){
                        toast.success("added to favorites")
                    }
                    else{
                        toast.warning("removed from favorites")
                    }
                    dispatch(fetchFavs())
                }
            } catch (error) {
                console.log(error.response);
                toast.info("There ate errors, try again")
            }
        }
    }

export const fetchFavs = () =>  async (dispatch, getState) => {
        if (localStorage["tok"]) {
            fetchFavsRequst()// set loading to true
            let url = API_URL + "/favs"
            try {
                let resp = await doApiGet(url)
                if (resp.data.favs_ar) {
                    console.log("function fetch work");
                    dispatch(fetchFavsSuccess(resp.data.favs_ar))
                }
            }
            catch (error) {
                dispatch(fetchFavsFailure(error))
            }
        }
        else
            toast.error("you must be logged in to add a favourite")
    }


