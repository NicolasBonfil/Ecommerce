import React from 'react'
import { CartItem } from './CartItem.jsx'


export const CartList = ({cart, updateQuantity, deleteCartItem}) => {
    return (
        <>
            {
                cart.map(p => {
                    const stock = p.product.stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    return(
                        <div key={p.product._id} className='cart-product'>
                            <CartItem p={p} updateQuantity={updateQuantity} deleteCartItem={deleteCartItem} stock={stock}/>
                        </div>

                    )
                })
            }
        </>
    )
}
