import { useFilterContext } from "../../../../Context/FilterContext.jsx"

export const SortProductsFilter = () => {
    const {filters, setFilters} = useFilterContext()
    
    const handleOnChange = (e) => {
        setFilters({...filters, "sort": e.target.value})
    }

    return (
        <>
            <h5 className='mb-3 p-0 filter-title'>
                <strong>
                    Ordenar
                </strong>
            </h5>
            <select value={filters.sort} onChange={handleOnChange}>
                <option value="">Más Relevantes</option>
                <option value="asc">Menor Precio</option>
                <option value="dsc">Mayor Precio</option>
            </select>
        </>
    )
}
