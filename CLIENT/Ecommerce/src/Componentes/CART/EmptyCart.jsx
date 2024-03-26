import React from 'react'
import { Link } from 'react-router-dom'

export const EmptyCart = () => {
    return (
        <div className='container-fluid p-5' id='empty-cart-container'>
            <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-8'>
                    <div className='w-100 d-flex flex-column align-items-center justify-content-center' style={{background: "white"}}>
                        <div id='empty-cart-detail'>
                            <img src="/shopping-bag.jpg" alt="" />
                            <h1>¡Empieza un carrito de compras!</h1>
                            <p>Agregá productos a tu carrito de compras</p>
                            <Link to="/products-section" className='btn btn-primary w-100 p-3'>Descubrir productos</Link>
                        </div>
                    </div>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-4'>
                    <div id='empty-cart-resume'>
                        <div id='empty-cart-resume-header'>
                            <h1>Resumen de compras</h1>
                        </div>
                        <div id='empty-cart-resume-footer'>
                            <p className='m-0'>Aquí verás los importes de tu compra una vez que agregues productos.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
