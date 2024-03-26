import { createContext, useContext, useState } from "react"

const FilterContext = createContext()
export const useFilterContext = () => useContext(FilterContext)


export const FilterContextProvider = ({children}) => {
    const [filters, setFilters] = useState({
        brand: "",
        minPrice: 0,
        maxPrice: 200000,
        sort: ""
    })

    const filteredProducts = (products) => {
        let fProducts = products;
        for (let [key, value] of Object.entries(filters)){

            if(key == "brand" && value) fProducts = fProducts.filter(product => product.brand == value)
            if(key == "minPrice" && value) fProducts = fProducts.filter(product => product.price >= value)
            if(key == "maxPrice" && value) fProducts = fProducts.filter(product => product.price <= value)
            if(key == "sort"  && value == "asc") fProducts.sort((a, b) => a.price - b.price);
            if(key == "sort"  && value == "dsc") fProducts.sort((a, b) => b.price - a.price);
        }

        return fProducts
    }

    return (
        <FilterContext.Provider value={{
            filters,
            setFilters,
            filteredProducts
        }}>
            {children}
        </FilterContext.Provider>
    )
}