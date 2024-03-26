import { Link } from 'react-router-dom'
import { Item } from '../ProductsSection/ProductsItems/Item.jsx'
import Slider from "react-slick";

export const CarouselDetail = ({products, handleItemClick, settings}) => {
    return (
        <>
            <div className="slider-container m-0 mb-5 w-100">
                <Slider {...settings}>
                    {
                        products.map(p => {
                            return (
                                <div className='item-carousel-container' key={p._id}>
                                    <div className='item-carousel'>
                                        <Link to={`/product/detail/${p._id}`} className='item-detail-link' draggable="false" onClick={handleItemClick}>
                                            <Item product={p}/>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </>
    )
}
