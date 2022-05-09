import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './cartItem';
import "../comps/css/cart.css";
import { deleteCartSingle, resetAll, ShowCart } from '../actions/cart_action';

function Cart(props){
    const {cart_ar, showCart, totalPrice} = useSelector(state => state)
    const dispatch  = useDispatch();

    return(
        <div style={{display:showCart}} className="cart">
        <button onClick={() =>dispatch(ShowCart())} className="btn btn-danger close-btn">close</button>
        <h2>Products in Cart</h2>
        {cart_ar.map(item=>{return(
            <CartItem key={item._id} item={item} />
        )})}
       
       {(cart_ar.length > 0) ?
       <button onClick={() =>dispatch(resetAll())} className="btn btn-danger float-end btn-item">delete all</button>
:""}
        <h2 >Total: {totalPrice} NIS</h2>
    </div> 
    )
}

export default Cart