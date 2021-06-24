import {ALL_PRODUCTS_REQUESTS, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, CLEAR_ERRORS} from'../constants/ProductConstants'

export const ProductReducer = (state = {products: [] }, action) => {
    switch(action.type){

        case ALL_PRODUCTS_REQUESTS:
            return {
                loading: true,
                products: []
            }
            case ALL_PRODUCTS_SUCCESS:
                return{
                    loading: false,
                    products: action.payload.products,
                    productCount: action.payload.productCount
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
