import { API_URL, doApiGet } from '../../services/apiService';

export const JOIN_SOCKET = 'JOIN_SOCKET';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

export const joinSocket = (_orderId) => {
  return {
    type: JOIN_SOCKET,
    payload: _orderId
  };
};

const fetchOrdersSuccess = (items) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload: items
  };
};

const fetchOrdersFailure = (err) => {
  return {
    type: FETCH_ORDERS_FAILURE,
    payload: err
  };
};

export const fetchOrders = () => async (dispatch, getState) => {
  if (localStorage['tok']) {
    let url = API_URL + '/orders/userOrder';
    try {
      let resp = await doApiGet(url);
      if (resp.data.length > 0) {
        let shortIds = resp.data.map((item) => item.short_id);
        dispatch(fetchOrdersSuccess(shortIds));
      }
    } catch (error) {
      dispatch(fetchOrdersFailure(error));
    }
  }
};
