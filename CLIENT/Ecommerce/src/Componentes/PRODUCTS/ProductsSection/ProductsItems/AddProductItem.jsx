import { Link } from 'react-router-dom'

export const AddProductItem = () => {
    return (
        <button id='add-product-item'>
            <Link to="/add-product" id='add-product-link'>
                <img src="/boton-sumar.png" alt="add-product-button" />
            </Link>
        </button>
    )
}
