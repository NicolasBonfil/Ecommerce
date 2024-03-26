import Axios from "axios"
import { CarouselDetail } from './CarouselDetail.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";


export const CarouselContainer = ({pid}) => {
    const [isDragging, setIsDragging] = useState(false);

    const settings = {
        className: "center",
        centerMode: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 1000,
        beforeChange: () => setIsDragging(true),
        afterChange: () => setIsDragging(false)
    }

    const [products, setProducts] = useState([])

    useEffect(() => {
        Axios.get("https://ecommerce-1-s9zq.onrender.com/api/products")
        .then(res => {
            let data = res.data;
            console.log(pid);
            if(pid) data = data.filter(p => p._id !== pid)
            setProducts(data);
        })
    }, [])

    const handleItemClick = (e) => {
        if (isDragging) {
          e.preventDefault();
        }
    };

    return (
        <>
            <CarouselDetail products={products} handleItemClick={handleItemClick} settings={settings}/>
        </>
    )
}
