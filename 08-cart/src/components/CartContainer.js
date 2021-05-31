import React,{ useState, useEffect } from 'react'
import { useGlobalContext } from './context'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const CartContainer = () => {
    const { dispatch, list, totalAmount } = useGlobalContext();
    
    useEffect(()=>{
        dispatch({type: 'calculateTotalAmount'})
    },[list])

    return (
        <section className='cart'>
            <div className="cart__center">
                <div className="cart__header">
                    <h2>your bag</h2>
                </div>
                {
                    totalAmount === 0 && <div className="emptyCart"><h4>is currently empty</h4></div>
                    
                }
                {
                    totalAmount !== 0 && 
                    <>                    
                        <div className="cart__items">
                        {
                            list.map((item)=>{
                                const {id,amount,img,title,price} = item;
                                return (
                                    <article key={id} className="item">
                                        <div className="item__img">
                                            <img src={img} alt={title} />
                                        </div>
                                        <div className="item__details">
                                            <div className="title">
                                                <h4>{title}</h4>
                                            </div>
                                            <div className="price">
                                                $ {price}
                                            </div>
                                            <div className="remove" onClick={()=>{
                                                dispatch({type: 'removeItem',payload: {id: id}})
                                            }}>
                                                <button>remove</button>
                                            </div>
                                        </div>
                                        <div className="item__amount">
                                            <div className="icon" onClick={()=>dispatch({type: 'increaseAmount',payload: {id: id}})}><FaChevronUp /></div>
                                            {
                                                amount===0 ? dispatch({type: 'removeItem',payload: {id: id}}) : <div className="amount">{amount}</div>                               
                                            }                                    
                                            <div className="icon" onClick={()=>dispatch({type: 'decreaseAmount',payload: {id: id}})}><FaChevronDown /></div>
                                        </div>
                                    </article>
                                )
                            })
                        }
                        </div>
                        <div className="amountTotal">
                            <h4>Total</h4>
                            <h4>$ {totalAmount.toFixed(2)}</h4>
                        </div>
                        <div className="clear">
                            <button className="btn" onClick={()=>dispatch({type:'emptyCart'})}>clear cart</button>
                        </div>                
                    </>
                }            
            </div>
        </section>
    )
}

export default CartContainer
