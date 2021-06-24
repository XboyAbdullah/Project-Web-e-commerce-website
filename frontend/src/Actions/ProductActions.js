import axios from 'axios';
import {ALL_PRODUCTS_REQUESTS, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, CLEAR_ERRORS} from'../constants/ProductConstants'


export const GetProducts = () => async (dispatch) => {
    try{
        dispatch({type: ALL_PRODUCTS_REQUESTS})
        const {data} = await axios.get('/api/v1/products')

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message    
        })
    }
};
// Clear Errors
export const ClearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
};