import axios from 'axios';
import {ALL_PRODUCTS_REQUESTS, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, PRODUCTS_DETAILS_REQUESTS, PRODUCTS_DETAILS_SUCCESS, PRODUCTS_DETAILS_FAIL,  CLEAR_ERRORS} from'../constants/ProductConstants';


export const GetProducts = (keyword = '',currentPage = 1) => async (dispatch) => {
    try{
        dispatch({type: ALL_PRODUCTS_REQUESTS})
        //const {data} = await axios.get('/api/v1/products')
        const {data} = await axios.get(`/api/v1/products?keyword = ${keyword}&page=${currentPage}`)

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


// Getting the products detail
export const GetProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({type: PRODUCTS_DETAILS_REQUESTS})
        const {data} = await axios.get(`/api/v1/product${id}`)

        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch(error) {
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
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