import {
  ADD_CART,
  DELETE_CART_SINGLE,
  REDUCE_ONE_CART,
  RESET_ALL_CART,
  SHOW_CART
} from '../actions/cart_action';

const initState = localStorage['cart']
  ? { ...JSON.parse(localStorage['cart']), showCart: 'none' } //initial cart status to unvisibility
  : {
      cart_ar: [],
      totalPrice: 0,
      store_short_id: '',
      showCart: 'none'
    };

export const clientReducer = (_state = initState, _action) => {
  let index = 0;
  switch (_action.type) {
    case DELETE_CART_SINGLE:
      let cart_ar = _state.cart_ar.filter((item) => item._id != _action.idDel);
      return saveLocal({ ..._state, cart_ar });
    case ADD_CART:
      index = _state.cart_ar.findIndex((item) => item._id == _action.newItem._id);
      //if obj not found, index = -1
      if (index >= 0) {
        //item already added
        _state.cart_ar[index].qty++;
      } else {
        //item not found
        // verify that the new item belongs to same store
        if (
          _state.store_short_id === '' ||
          _state.store_short_id === _action.newItem.store_short_id
        ) {
          _action.newItem.qty = 1; // create and initial amout element to 1
          _state.cart_ar = [..._state.cart_ar, _action.newItem]; //add new item
          _state.store_short_id = _action.newItem.store_short_id;
        }
      }
      return saveLocal({ ..._state });
    case RESET_ALL_CART:
      return saveLocal({ ..._state, cart_ar: [], store_short_id: '' });
    case SHOW_CART:
      return saveLocal({
        ..._state,
        showCart: _state.showCart == 'none' ? 'block' : 'none'
      });
    case REDUCE_ONE_CART: //redude the qty in cart
      index = _state.cart_ar.findIndex((item) => item._id == _action.itemId);
      let qty = _state.cart_ar[index].qty;
      _state.cart_ar[index].qty = qty > 1 ? qty - 1 : 1; //qty must be positive
      return saveLocal({ ..._state });
    default:
      return _state;
  }
};

const calculate = (_state) => {
  let sum = 0;
  _state.cart_ar.forEach((item) => {
    sum += item.price * item.qty;
  });
  _state.totalPrice = sum;
};

// save in local and return state - updateStateAndLocal
const saveLocal = (_newState) => {
  calculate(_newState);
  localStorage.setItem('cart', JSON.stringify(_newState));
  return _newState;
};
