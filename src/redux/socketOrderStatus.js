import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { API_URL } from '../services/apiService';
import { fetchOrders } from './actions/socket_action';

const socket = io.connect(API_URL);

function SocketOrderStatus(props) {
  const dispatch = useDispatch();
  const orderIds = useSelector((state) => state.socketReducer);

  useEffect(() => {
    if (localStorage['tok']) {
      dispatch(fetchOrders());
    }
  }, []);

  useEffect(() => {
    if (orderIds.length > 0) {
      console.log('from socket');
      orderIds.forEach((item) => {
        socket.emit('join', item);
      });
      socket.on('order_shipped', (data) => {
        toast.success(data.msg);
        console.log('listening');
      });
      socket.on('order_completed', (data) => {
        toast.success(data.msg);
        console.log('listening');
      });
    }
  }, [orderIds]);
  return <></>;
}

export default SocketOrderStatus;
