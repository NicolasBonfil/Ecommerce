import React from 'react'

export const ProductDetail = ({addToCart, updateQuantity, product, quantity}) => {
    return (
        <>
            <div id='product-detail-card' className='row'>
                <div className='col-sm-12 col-md-9 col-lg-7' id='product-detail-image'>
                    <img src={`https://ecommerce-1-s9zq.onrender.com/products/images/${product.images[0]}`} alt="" className='img-fluid h-100'/>  
                </div>

                <div className='col-sm-12 col-md-3 col-lg-5' id='product-detail-body'>
                    <div id='product-detail-info'>
                        <h2 id='product-detail-title'>{product.title}</h2>
                        <p id='product-detail-price'>${product.price.toLocaleString("es-ar")}</p>
                    </div>

                    <div className='d-flex flex-column' id='product-detail-subtitle'>
                        <p>Hasta 6 cuotas sin interés</p>
                        <p>Calcular Envío</p>
                    </div>

                    <div id='product-detail-add-to-cart'>
                        <div className='d-flex align-items-center'>
                            <div className='product-quantity-counter d-flex align-items-center justify-content-center'>
                                <button onClick={() => updateQuantity("-")}>-</button>
                                <p className='m-0'>{quantity}</p>
                                <button onClick={() => updateQuantity("+")}>+</button>
                            </div>
                            <p className='total-stock m-0'>({product.stock.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}) disponibles</p>
                        </div>
                        <button id='product-detail-add-to-cart-button' className='btn btn-dark rounded-0' onClick={() => addToCart(product._id, quantity)}>Agregar al Carrito</button>   
                    </div>
                </div>
            </div>

            <div className='row mb-5' id='product-detail-description-container'>
                <div className='col-sm-12 col-md-4 col-lg-3 p-0'>
                    <h3>Descripción</h3>
                </div>
                <div id='product-detail-description' className='col-sm-12 col-md-8 col-lg-9'>
                    <p>{product.description}</p>
                </div>
            </div>
        </>
    )
}
