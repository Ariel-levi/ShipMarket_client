import { FETCH_ORDERS_SUCCESS, JOIN_SOCKET } from '../actions/socket_action';

export const initState = [];

export const socketReducer = (state = initState, action) => {
  // const socket =
  switch (action.type) {
    case FETCH_ORDERS_SUCCESS:
      return [action.payload];
    case JOIN_SOCKET:
      return [action.payload];

    default:
      return state;
  }
};
