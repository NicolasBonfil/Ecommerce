import { useEffect, useState } from 'react'

export const CheckoutResume = ({price, quantity, purchase}) => {
    return (
        <>
            <div id='checkout-resume-detail'>
                <div id="cart-resume-header">
                    <h1>Resumen de compras</h1>
                </div>
                <div id='cart-resume-body'>
                    <div id='cart-resume-total-quantity'>
                        <p className='m-0'>Productos ({quantity})</p>
                    </div>
                    <div id='cart-resume-total-price'>
                        <h2>Total</h2>
                        <p>${price.toLocaleString("es-ar")}</p>
                    </div>
                </div>
                <div id='cart-resume-footer'>
                    <button className='btn btn-primary w-100' onClick={purchase}>Pagar</button>
                </div>
            </div>
        </>
    )
}
