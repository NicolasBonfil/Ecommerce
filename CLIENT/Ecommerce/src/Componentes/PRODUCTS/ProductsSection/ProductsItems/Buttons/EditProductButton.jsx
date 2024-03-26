import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

export const EditProductButton = ({id}) => {
    return (
        <div id='edit-product-button'>
            <Link to={`/edit-product/${id}`}>
                <FontAwesomeIcon icon={faPencil}/>
            </Link>
        </div>
    )
}
