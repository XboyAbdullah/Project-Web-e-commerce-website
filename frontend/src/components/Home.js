import React, {useEffect, useState  } from 'react'
import Metadata from './layouts/Metadata'
import {useDispatch, useSelector} from 'react-redux'
import {GetProducts} from '../Actions/ProductActions'
import Product from './Product/Product'
import {useAlert} from 'react-alert'
import Loader from './layouts/Loader'
import { Pagination} from 'react-bootstrap'





function Home({match}) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const keyword = match.params.keyword

  const {loading, products, error, productCount, resultsPerPage} = useSelector(state => state.products)
  // The first thing to run when this component loads
  useEffect(() => { 

    if(error){
      return alert.error(error)
    }

    dispatch(GetProducts(keyword,currentPage));

    
    }, [dispatch, alert, error, keyword, currentPage])


    function setCurrentPageNo(pageNumber){
      setCurrentPage(pageNumber)
    }
    return (
        <div>
          {loading ? <Loader/> : (
            <div>
               <Metadata title = {'Buy Best Products online'}/>
               <h1 id="products_heading">Latest Products</h1>

               <section id="products" className="container mt-5">
                <div className="row">
                  {products && products.map(product => (
                  <Product key = {product._id} products = {product}/>
                  ))}
                </div> 
              </section>
              {resultsPerPage <= productCount &&(
              <div className = "d-flex justify-content-center mt-5">
                <Pagination 
                activepage = {currentPage}
                itemscountperpage = {resultsPerPage }
                totalitemscount = {productCount}
                onChange = {setCurrentPageNo}
                nextpagetext = {'Next'}
                prevpagetext = {"Prev"}
                firstpagetext = {'First'}
                lastpagetext = {'Last'}
                itemclass = "page-item"
                linkclass = "page-link"
                />
              </div>
              )}
            </div>
          )}
        </div>
    )
}

export default Home
