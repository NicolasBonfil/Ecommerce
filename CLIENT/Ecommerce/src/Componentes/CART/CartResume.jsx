import React from 'react'
import { Link } from 'react-router-dom'

export const CartResume = ({totalQuantity, totalPrice}) => {
    return(
        <div  id="cart-resume">
            <div id="cart-resume-header">
                <h1>Resumen de compras</h1>
            </div>
            <div id='cart-resume-body'>
                <div id='cart-resume-total-quantity'>
                    <p className='m-0'>Productos ({totalQuantity})</p>
                </div>
                <div id='cart-resume-total-price'>
                    <h2>Total</h2>
                    <p>${totalPrice.toLocaleString("es-ar")}</p>
                </div>
            </div>
            <div id='cart-resume-footer'>
                <Link to="/checkout" className='w-50'>
                    <button className='btn btn-primary w-100'>Comprar</button>
                </Link>
            </div>
        </div>

    )
}
