import React, {useEffect} from 'react'
import Metadata from './layouts/Metadata'
import {useDispatch, useSelector} from 'react-redux'
import {GetProducts} from '../Actions/ProductActions'
import Product from './Product/Product'
import {useAlert} from 'react-alert'

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();


  const {loading, products, error, productCount} = useSelector(state => state.products)
  // The first thing to run when this component loads
  useEffect(() => { 

    if(error){
      return alert.error(error)
    }

    dispatch(GetProducts());

    
    }, [dispatch, alert, error])

    return (
        <div>
          {loading ? <h1>loading....</h1> : (
            <div>
               <Metadata title = {'Buy Best Products online'}/>
               <h1 id="products_heading">Latest Products</h1>

               <section id="products" className="container mt-5">
                <div className="row">
                  {products && products.map(product => (
                  <Product key = {product._id} product = {product}/>
                  ))}
        
                </div>
              </section>
            </div>
          )}
        </div>
    )
}

export default Home
