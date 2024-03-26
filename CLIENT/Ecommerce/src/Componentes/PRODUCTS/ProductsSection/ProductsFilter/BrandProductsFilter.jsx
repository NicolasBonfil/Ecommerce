import { useFilterContext } from "../../../../Context/FilterContext.jsx"

export const BrandProductsFilter = ({brands}) => {

    const {filters, setFilters} = useFilterContext()

    const handleOnChange = (e) => {
        e.target.value === filters.brand? setFilters({...filters, "brand": ""}) : setFilters({...filters, "brand": e.target.value})
    }
 
    return (
        <>
            <h5 className='mb-3 p-0 filter-title'>
                <strong>
                    Marca
                </strong>
            </h5>

            {
                brands.map(b => {
                    return(
                        <div className='b-checkbox' key={b}>
                            <input type="checkbox" name="" id="" checked={filters.brand === b} value={b} onChange={handleOnChange}/>
                            <label>{b}</label>
                        </div>
                    )
                })
            }
        </>
    )
}
