import React, { useState, useEffect } from 'react'
import { ACTIONS, useGlobalContext} from './context'
import { Link } from 'react-router-dom'

const Products = () => {
    const { dispatch, categories, cart, filter, products, loading, error} = useGlobalContext();

    const [filteredProducts,setFilteredProducts] = useState([]);

    useEffect(()=>{
        setFilteredProducts(() => {
            if(filter.toLowerCase() === 'all')
                return products;
            else
                return products.filter(item => item.category === filter)
        });
    },[filter,products])



    if(loading){
        return <div className='loading-msg'>
            <h1>Fetching you the best products...</h1>
        </div>
    }

    if(error){
        return <div className='erro-msg'>
            <h1>Oops! Something went wrong...</h1>
        </div>
    }

    return (
        <>
        <div className="filter-menu">
            {
                categories.map((category,index) => {
                    return (
                        <div key={index} className={filter.toLowerCase()===category.toLowerCase()?'btn btn-selected':"btn"} onClick={()=>dispatch({type: ACTIONS.SET_FILTER,payload: {filter: category}})}>{category}</div>
                    )
                })
            }
        </div>
        <div className='products'>
            {
                filteredProducts.map(item => {
                    const {id,title,image} = item;

                    return (
                        <section key={id} className='product'>
                            <Link to={`/product/${id}`}>
                                <div className="product__image">
                                    <img src={image} alt={title} />
                                </div>
                                <div className="product__title">{title}</div>
                            </Link>
                            {
                                cart.some(item=>item.id===id) ? <div className='addToCart blur'><p>Item added to cart</p></div> : <div className='addToCart' onClick={()=>dispatch({type: ACTIONS.ADD_TO_CART,payload: {id}})}><p>add to cart</p></div>
                            }                            
                        </section>
                    )
                })
            }
        </div>
        </>
    )
}

export default Products
