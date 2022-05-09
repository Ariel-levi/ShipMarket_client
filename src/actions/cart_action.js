export const ADD_CART = "ADD_CART";
export const RESET_ALL_CART = "RESET_ALL_CART";
export const DELETE_CART_SINGLE = "DELETE_CART_SINGLE";
export const SHOW_CART = "SHOW_CART";
export const REDUCE_ONE_CART = "REDUCE_ONE_CART";

export const deleteCartSingle = (idDel) => {
    return {type:DELETE_CART_SINGLE, idDel}
}

export const addCart = (newItem) => {
    return {type:ADD_CART,newItem}
}

export const resetAll = () => {
    return {type:RESET_ALL_CART}
}

export const ShowCart = () =>{
    return {type:SHOW_CART}
}

export const reduceOneCart = (itemId) => {
    return {type:REDUCE_ONE_CART, itemId}
}