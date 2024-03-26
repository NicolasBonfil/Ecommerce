import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductsItemList } from './ProductsItems/ProductsItemList.jsx';
import { ProductsFilter } from './ProductsFilter/ProductsFilter.jsx';
import { useEffect, useState } from 'react';
import Axios from "axios"
import { HeaderContainer } from '../../HEADER/HeaderContainer.jsx';
import { Loading } from '../../LOADING/Loading.jsx';
import { FooterContainer } from '../../FOOTER/FooterContainer.jsx';
import { useFilterContext } from '../../../Context/FilterContext.jsx';

export const ProductsSection = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        Axios.get("http://localhost:8080/api/users")
        .then(result => {
            if(result.data.role === "ADMIN") setIsAdmin(true)
        })
    }, [])

    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const {filteredProducts, filters} = useFilterContext()

    useEffect(() => {
        setIsLoading(true);
        Axios.get("http://localhost:8080/api/products")
        .then(res => {
            setProducts(filteredProducts(res.data));

            const brands = []
            res.data.forEach(p => {
                if(!brands.includes(p.brand)) brands.push(p.brand)
            });

            setBrands(brands);
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [filters])


    const deleteProduct = (pid) => {
        Axios.delete(`http://localhost:8080/api/products/${pid}`)
        .then(() => {
            let newList = products.filter((product) => product._id !== pid)
            setProducts(newList)
        })
    }
    
    return (
        <>
            <HeaderContainer/>
            {
                isLoading?
                    <Loading/>
                :
                    <div id="products-section" className='container-fluid p-3'>
                        <div className="row">
                            <div id="filter-container" className='col-sm-12 col-md-5 col-lg-3'>
                                <ProductsFilter brands={brands}/>
                            </div>
                            
                            <div id="products-container" className='col-sm-12 col-md-7 col-lg-9'>
                                <ProductsItemList isAdmin={isAdmin} products={products} deleteProduct={deleteProduct}/>
                            </div>
                        </div>
                    </div>
            }
            <FooterContainer/>
        </>
    )
}
