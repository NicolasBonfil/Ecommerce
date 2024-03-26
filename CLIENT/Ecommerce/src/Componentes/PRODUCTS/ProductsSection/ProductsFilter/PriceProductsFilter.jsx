import Slider from "react-slider"
import { useFilterContext } from "../../../../Context/FilterContext.jsx"
import { useState } from "react"

export const PriceProductsFilter = () => {
    const {filters, setFilters} = useFilterContext()

    const MIN = 1
    const MAX = 200000

    const handleAfterChange = (e) => {
        setFilters({ ...filters, "minPrice": e[0], "maxPrice": e[1] });
    }

    const [values, setValues] = useState([filters.minPrice, filters.maxPrice])

    return (
        <>
            <h5 className='mb-3 p-0 filter-title'>
                <strong>
                    ${values[0]} - ${values[1].toLocaleString("es-ar")}
                </strong>
            </h5>
            <Slider className="slider" value={[filters.minPrice, filters.maxPrice]} min={MIN} max={MAX} onAfterChange={handleAfterChange} onChange={setValues}/>
        </>
    )
}
