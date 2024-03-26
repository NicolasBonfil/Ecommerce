import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
// import Axios from "axios"
// import { useEffect, useState } from 'react'

export const HeaderButtons = ({isLog}) => {
    return (
        <>  
            <div id='session-button-container'>
                <Link to={isLog? "/profile" : "/login"} id="session-button-link">
                    <FontAwesomeIcon icon={faUser} />
                </Link>
            </div>
            
            <div id='cart-button-container'>
                <Link to="/cart" id="cart-button-link">
                    <FontAwesomeIcon icon={faCartShopping}/>
                </Link>
            </div>
        </>
    )
}
