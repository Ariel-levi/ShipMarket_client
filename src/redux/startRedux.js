import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFavs } from './actions/favs_action';

function StartRedux(props){
    const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFavs());
  }, [])
    return(
        <div></div> 
    )
}

export default StartRedux