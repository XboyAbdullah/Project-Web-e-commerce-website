import React from 'react'
import {Link} from 'react-router-dom'

const Product = (props) => {
  console.log(props);
    return (
                  <div  className="col-sm-12 col-md-6 col-lg-3 my-3">
          <div className="card p-3 rounded">
            {/* <img
              className="card-img-top mx-auto"
              src={product.images[0].url} 
            /> */}
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Link to = {`/product/${props.product._id}`}>{props.product.name}</Link>
              </h5>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner" style = {{width: `${(props.product.ratings/5)*100}%`}}></div>
                </div>
                <span id="no_of_reviews">({props.product.Num_Of_reviews} Reviews)</span>
              </div>
              <p className="card-text">{props.product.price}</p>
              <Link to = {`/product/${props.product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
            </div>
          </div>
        </div>
    )
}

export default Product
