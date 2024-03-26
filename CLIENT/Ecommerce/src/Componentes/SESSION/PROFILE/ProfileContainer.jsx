import Axios from "axios"
import { useNavigate } from "react-router-dom"
import { HeaderContainer } from "../../HEADER/HeaderContainer.jsx"
import { FooterContainer } from "../../FOOTER/FooterContainer.jsx"
export const ProfileContainer = () => {
    const navigate = useNavigate()
    
    const logout = () => {
        Axios.post("https://ecommerce-1-s9zq.onrender.com/api/sessions/logout")
        .then(res => {
            navigate("/")
        })
    }

    return (
        <>
            <HeaderContainer/>
            <div>
                <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>
            <FooterContainer/>
        </>
    )
}
