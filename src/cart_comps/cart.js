import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './cartItem';
import "../comps/css/cart.css";
import { deleteCartSingle, resetAll, ShowCart } from '../actions/cart_action';

function Cart(props){
    let [total,setTotal] = useState(0)

    const {cart_ar, showCart} = useSelector(state => state)
    const dispatch  = useDispatch();

    useEffect(() => {
        calculate()
        // countDuplicate()
    },[cart_ar])

    const calculate = () => { 
        let sum=0
        cart_ar.forEach(item=>{
            sum += item.price*item.amount
        })
        setTotal(sum)
        
    }
    
    return(
        <div style={{display:showCart}} className="cart">
        <button onClick={() =>dispatch(ShowCart())} className="btn btn-danger close-btn">close</button>
        <h2>Products in Cart</h2>
        {cart_ar.map(item=>{return(
            <CartItem key={item._id} item={item} calculate={calculate}/>
        )})}
       
       {(cart_ar.length > 0) ?
       <button onClick={() =>dispatch(resetAll())} className="btn btn-danger float-end btn-item">delete all</button>
:""}
        <h2 >Total: {total} NIS</h2>


    </div> 
    )
}

export default Cart