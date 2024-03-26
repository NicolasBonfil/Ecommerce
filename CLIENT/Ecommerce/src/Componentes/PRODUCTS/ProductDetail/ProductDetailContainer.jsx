import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loading } from '../../LOADING/Loading.jsx'
import { HeaderContainer } from '../../HEADER/HeaderContainer.jsx'
import { ProductDetail } from './ProductDetail.jsx'
import { FooterContainer } from '../../FOOTER/FooterContainer.jsx'
import { CarouselContainer } from '../Carousel/CarouselContainer.jsx'

export const ProductDetailContainer = () => {
    const {pid} = useParams()
    const [product, setProduct] = useState({})
	const [quantity, setQuantity] = useState(1)
	const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        Axios.get(`https://ecommerce-1-s9zq.onrender.com/api/products/${pid}`)
        .then(res => {
            setProduct(res.data)
        })
		.finally(() => setIsLoading(false))
    }, [pid])

	const updateQuantity = (operation) => {
		if(operation === "+" &&  quantity < product.stock){
			setQuantity(quantity + 1)
		}else if( operation === "-" && quantity >= 2){
			setQuantity(quantity - 1)
		}
	}

	const navigate = useNavigate()

	const addToCart = (id, quantity) => {

        Axios.put("https://ecommerce-1-s9zq.onrender.com/api/carts/products", {id, quantity})
		.then(() => {
			navigate("/products")
		})
		.catch(res => {
			if(res.response.status === 401) navigate("/login")
		})
    }

    return (
        <>
            <HeaderContainer/>
            {
                isLoading?
                    <Loading/>
                :
                    <div id='product-detail-container' className='container-fluid'>
                        <div id="product-detail">
                            <ProductDetail quantity={quantity} addToCart={addToCart} updateQuantity={updateQuantity} product={product}/>
                            <h2>Más productos que podrian interesarte</h2>                            
                            <CarouselContainer pid={product._id}/>
                        </div>
                    </div>
            }
            <FooterContainer/>
        </>
    )
}
