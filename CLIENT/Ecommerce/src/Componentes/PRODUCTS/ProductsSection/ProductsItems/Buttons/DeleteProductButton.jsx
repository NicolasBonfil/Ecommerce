import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const DeleteProductButton = ({deleteProduct, id}) => {
    return (
        <button id='delete-product-button'>
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteProduct(id)}/>
        </button>
    )
}
