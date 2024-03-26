import { BrandProductsFilter } from "./BrandProductsFilter.jsx"
import { PriceProductsFilter } from "./PriceProductsFilter.jsx"
import { SortProductsFilter } from "./SortProductsFilter.jsx"

export const ProductsFilter = ({brands}) => {
    return (
        <>
            <div id='sort-products-filter'>
                <SortProductsFilter/>
            </div>

            <div id='brand-products-filter'>
                <BrandProductsFilter brands={brands}/>
            </div>

            <div id='price-products-filter'>
                <PriceProductsFilter/>
            </div>
        </>
    )
}
