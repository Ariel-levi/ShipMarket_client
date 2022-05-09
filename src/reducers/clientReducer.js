import { ADD_CART, DELETE_CART_SINGLE, REDUCE_ONE_CART, RESET_ALL_CART, SHOW_CART } from "../actions/cart_action";

const initState = localStorage["cart"] ? JSON.parse(localStorage["cart"]) : {
  cart_ar: [],
  showCart: "none"
}

export const clientReducer = (_state = initState, _action) => {
  let index =0
  switch (_action.type) {
    case DELETE_CART_SINGLE:
      let cart_ar = _state.cart_ar.filter(item => item._id != _action.idDel)
      return saveLocal({ ..._state, cart_ar })
    case ADD_CART:
       index = _state.cart_ar.findIndex(item => item._id == _action.newItem._id)
       //if obj not found, index = -1
      if (index >= 0) {//item already added
        _state.cart_ar[index].amount++
      }
      else {//item not found
        _action.newItem.amount = 1; // create and initial amout element to 1
        _state.cart_ar = [..._state.cart_ar, _action.newItem] //add new item
      }
      return saveLocal({ ..._state});
    case RESET_ALL_CART:
      return saveLocal({..._state, cart_ar: [] })
    case SHOW_CART:
      return saveLocal({ ..._state, showCart: (_state.showCart == "none") ? "block" : "none" })
    case REDUCE_ONE_CART: //redude the amount in cart
       index = _state.cart_ar.findIndex(item => item._id == _action.itemId)
      let amount = _state.cart_ar[index].amount
      _state.cart_ar[index].amount = (amount >1)? amount -1 :1;//amount must be positive
      return saveLocal({ ..._state })
    default:
      return _state;
  }

}

// save in local and return state - updateStateAndLocal
const saveLocal = (_newState) => {
  localStorage.setItem("cart", JSON.stringify(_newState));
  return _newState;
}