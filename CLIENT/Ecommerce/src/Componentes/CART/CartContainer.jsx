import React, { useEffect, useState } from 'react'
import Axios from "axios"
import { useNavigate } from 'react-router-dom'
import { CartResume } from './CartResume.jsx'
import { CartList } from './CartList.jsx'
import { EmptyCart } from './EmptyCart.jsx'
import { Loading } from '../LOADING/Loading.jsx'
import { HeaderContainer } from '../HEADER/HeaderContainer.jsx'
import { FooterContainer } from '../FOOTER/FooterContainer.jsx'


export const CartContainer = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [cart, setCart] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        Axios.get("http://localhost:8080/api/carts")
        .then(res => {
            setCart(res.data)
        })
        .catch(error => {
            navigate("/login")
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])


    const deleteCartItem = (pid) => {
        Axios.delete(`http://localhost:8080/api/carts/products/${pid}`)
        .then(() =>{
            const updatedCart = cart.filter(p => p.product._id !== pid)
            setCart(updatedCart)
        })
    }

    const deleteCartItems = () => {
        Axios.delete("http://localhost:8080/api/carts/products")
        .then(() => {
            navigate("/products")
        })

    }

    useEffect(() => {
        const productsQuantity = cart.reduce((accumulator, product) => {
            return accumulator + product.quantity;
        }, 0)

        setTotalQuantity(productsQuantity)

        const productsPrice = cart.reduce((accumulator, product) => {
            return accumulator + product.product.price * product.quantity;
        }, 0)

        setTotalPrice(productsPrice)
    }, [cart])

    const updateQuantity = (operation, pid) => {
        Axios.put(`http://localhost:8080/api/carts/products/${pid}`, {operation})
        .then(res => {
            const updatedItems = cart.map(product => {
                if (product.product._id === pid) {
                    return { ...product, quantity: res.data.payload };
                }
                return product;
            });
        
            setCart(updatedItems);
        })
        .catch(error => console.log(error))
    }

    return (
        <>
            <HeaderContainer/>
            {
                isLoading?
                    <Loading/>
                :
                    cart.length > 0?
                    
                    <div className='container-fluid p-5' id='cart-container'>
                        <div className='row'>
                            <div className='col-sm-12 col-md-12 col-lg-8'>
                                <CartList cart={cart} deleteCartItem={deleteCartItem} updateQuantity={updateQuantity}/>
                            </div>
                            <div className='col-sm-12 col-md-12 col-lg-4'>
                                <CartResume totalQuantity={totalQuantity} totalPrice={totalPrice}/>
                            </div>
                        </div>
                    </div>
                    :
                    <EmptyCart/>
            }
            <FooterContainer/>
        </>
    )
}
