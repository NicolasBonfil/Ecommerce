import { useNavigate } from 'react-router-dom'
import { CartResume } from '../CART/CartResume.jsx'
import { FooterContainer } from '../FOOTER/FooterContainer.jsx'
import { HeaderContainer } from '../HEADER/HeaderContainer.jsx'
import Axios from "axios"
import { useEffect, useState } from 'react'
import Swal from "sweetalert2"
import { CheckoutResume } from './CheckoutResume.jsx'
import { UserInfo } from './UserInfo.jsx'
import { CheckoutAddressContainer } from './ADDRESS/CheckoutAddressContainer.jsx'
import { useAddressContext } from '../../Context/AddressContext.jsx'

export const CheckoutContainer = () => {
    const {saveAddress, address} = useAddressContext()

    const [user, setUser] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)

    const [errors, setErrors] = useState({})

    useEffect(() => {
        Axios.get("https://ecommerce-1-s9zq.onrender.com/api/users")
        .then((res) => {
            setUser(res.data)
        })
        .catch(error => {
            navigate("/login")
        })

        Axios.get("https://ecommerce-1-s9zq.onrender.com/api/carts")
        .then((res) => {
            const productsQuantity = res.data.reduce((accumulator, product) => {
                return accumulator + product.quantity;
            }, 0)
    
            setQuantity(productsQuantity)
        
            const productsPrice = res.data.reduce((accumulator, product) => {
                return accumulator + product.product.price * product.quantity;
            }, 0)
    
            setPrice(productsPrice)
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    const navigate = useNavigate()

    const logout = () => {
        Axios.post("https://ecommerce-1-s9zq.onrender.com/api/sessions/logout")
        .then(res => {
            navigate("/")
        })
    }

    const purchase = async () => {
        try {
            const cart = user.cart;
            const userId = user._id
            const receiver = address.name

            let code;

            await Axios.post("https://ecommerce-1-s9zq.onrender.com/api/users/add-address", address)
            .then(res => {
                res.data.payload? code = res.data.payload : code = address.addressCode
            })
            await Axios.post("https://ecommerce-1-s9zq.onrender.com/api/tickets", {cart, userId, receiver, code})
            await Axios.delete("https://ecommerce-1-s9zq.onrender.com/api/carts/products")
    
            Swal.fire({
                title: "Se ha realizado la compra con éxito",
                subtitle: `Te llegará un correo electrónico a ${user.email} con los detalles de la compra`,
                icon: "success",
                showConfirmButton: true
            }).then(result => {
                if(result.isConfirmed){
                    navigate("/")
                }
            });
        } catch (error) {
            if (error.config.url.includes("/add-address")) {
                const formErrors = {}
                    for (const key in address) {
                        if (!address[key]) {
                        formErrors[key] = error.response.data.message;
                        }
                    }

                    if(Object.keys(formErrors).length === 0){
                        formErrors.error = error.response.data.message
                    }

                    setErrors(formErrors)    
            } else {
                Swal.fire({
                    title: "Ocurrió un error",
                    subtitle: "No se pudo procesar tu compra",
                    icon: "error",
                    showCloseButton: true
                });
            }
        }
    }

    return (
        <>
            <HeaderContainer/>
            {
                user?
                    <div id='checkout-container' className='container-fluid p-5'>
                        <div className='row'>
                            <div id='order-form' className='col-sm-12 col-md-8 col-lg-8'>
                                <UserInfo user={user} logout={logout}/>
                                <CheckoutAddressContainer user={user} errors={errors}/>
                            </div>
                            
                            <div id='checkout-resume' className='col-sm-12 col-md-4 col-lg-4'>
                                <CheckoutResume quantity={quantity} price={price} purchase={purchase} saveAddress={saveAddress}/>
                            </div>
                        </div>
                    </div>
                :
                    ""
            }
            <FooterContainer/>
        </>
    )
}
