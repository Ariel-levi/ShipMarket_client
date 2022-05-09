import React from 'react';
import { useDispatch } from 'react-redux';
import { addCart, deleteCartSingle, reduceOneCart } from '../actions/cart_action';

function CartItem(props){
    const dispatch = useDispatch()
    let item = props.item;
    
    return(
        <div className='border pt-2 px-2'>
            {/* delete product from cart */}
            <button onClick={()=> dispatch(deleteCartSingle(item._id))} className='badge bg-danger float-end ms-2 btn-item'>X</button>
            {/* add button */}
            <h4 className="float-end"><button className="btn btn-success btn-item" onClick={()=> dispatch(addCart(item))}>+
            </button>{item.amount}
            {/* reduce button */}
            <button className="btn btn-item btn-danger " onClick={()=>dispatch(reduceOneCart(item._id))}>-</button></h4>
            <h4>{item.name} - {item.price}</h4>
            
        </div> 
    )
}

export default CartItem