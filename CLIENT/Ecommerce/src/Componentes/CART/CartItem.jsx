import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const CartItem = ({p, updateQuantity, deleteCartItem, stock}) => {
    return (
        <>
            <div className='cart-product-image'>
                <img src={`https://ecommerce-1-s9zq.onrender.com/products/images/${p.product.images[0]}`} alt="" />
            </div>
            <div className='cart-product-info'>
                <p>{p.product.title}</p>
                <div className='product-quantity-counter d-flex align-items-center justify-content-center'>
                    <button onClick={() => updateQuantity("-", p.product._id)}>-</button>
                    <p className='m-0'>{p.quantity}</p>
                    <button onClick={() => updateQuantity("+", p.product._id)}>+</button>
                </div>
        
                <p className='total-stock'>({stock}) disponibles</p>
            </div>
            <div className='cart-product-price'>
                <p>{p.quantity} X ${p.product.price.toLocaleString("es-ar")}</p>
                <p>Total: ${(p.quantity*p.product.price).toLocaleString("es-ar")}</p>
            </div>
            <button className='delete-cart-product' onClick={() => deleteCartItem(p.product._id)}><FontAwesomeIcon icon={faTrash}/></button>
        </>
    )
}
