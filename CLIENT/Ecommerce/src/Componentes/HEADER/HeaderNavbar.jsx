import { Link } from "react-router-dom"

export const HeaderNavbar = () => {
    return (
        <>
            <ul id="navbar-item-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-item-link">
                        INICIO
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/products-section" className="navbar-item-link">
                        PRODUCTS
                    </Link>
                </li>
            </ul>
        </>
    )
}
