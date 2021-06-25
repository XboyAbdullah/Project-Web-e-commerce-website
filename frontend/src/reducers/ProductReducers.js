import {ALL_PRODUCTS_REQUESTS, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, PRODUCTS_DETAILS_REQUESTS, PRODUCTS_DETAILS_SUCCESS, PRODUCTS_DETAILS_FAIL,  CLEAR_ERRORS} from'../constants/ProductConstants'

export const ProductReducer = (state = {product: [] }, action) => {
    switch(action.type){

        case ALL_PRODUCTS_REQUESTS:
            return {
                loading: true,
                product: []
            }
            case ALL_PRODUCTS_SUCCESS:
                return{
                    loading: false,
                    products: action.payload.products,
                    productCount: action.payload.productCount,
                    resultsPerPage: action.payload.resultsPerPage
                }
            case ALL_PRODUCTS_FAIL:
                return{
                    loading: false,
                    error: action.payload
                }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error: null
                }
        default:
            return state;
    }
}

export const ProductDetailReducer = (state = {product: {}}, action) => {
    switch(action.type){
        case PRODUCTS_DETAILS_REQUESTS:
            return{ ...state,
                loading: true
            }
            case PRODUCTS_DETAILS_SUCCESS:
                return{
                    loading: false,
                    product: action.payload
                }
            case PRODUCTS_DETAILS_FAIL:
                return{
                    ...state,
                    error: null
                }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error: null
                }
        default:
            return state;
    }
}