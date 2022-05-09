import React from 'react';
import { useDispatch } from 'react-redux';
import { addCart, deleteCartSingle, reduceOneCart } from '../actions/cart_action';

function CartItem(props){
    const dispatch = useDispatch()
    let item = props.item;
    // let setCart_ar = props.setCart_ar
    
    return(
        <div className='border pt-2 px-2'>
            <button onClick={()=> dispatch(deleteCartSingle(item._id))} className='badge bg-danger float-end ms-2 btn-item'>X</button>
            <h4 className="float-end"><button className="btn btn-success btn-item" onClick={()=> dispatch(addCart(item))}>+
            </button>{item.amount}
            <button className="btn btn-item btn-danger " onClick={()=>dispatch(reduceOneCart(item._id))}>-</button></h4>
            <h4>{item.name} - {item.price}</h4>
            
        </div> 
    )
}

export default CartItem