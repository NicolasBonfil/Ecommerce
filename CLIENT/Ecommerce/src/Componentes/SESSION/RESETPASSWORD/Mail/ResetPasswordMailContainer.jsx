import { useState } from "react"
import { HeaderContainer } from "../../../HEADER/HeaderContainer.jsx"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import { ResetPasswordMailDetail } from "./ResetPasswordMailDetail.jsx"
import { FooterContainer } from "../../../FOOTER/FooterContainer.jsx"

export const ResetPasswordMailContainer = () => {
    const [error, setError] = useState({})
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleOnChange = (e) => {
        setError("")
        setEmail(e.target.value)
    }

    const navigate = useNavigate()

    const sendMail = () => {
        setIsLoading(true)
        Axios.post("https://ecommerce-1-s9zq.onrender.com/api/sessions/request-password-reset", {email})
        .then(res => {
            navigate(`/reset-password/checkpoint/${email}`)
        })
        .catch(error => {
            if(!email) return setError({"mail": "Completa este campo"})
            setError({"error": error.response.data.message})
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <>
            <HeaderContainer/>
            <div id="reset-password-mail-container" className="container-fluid">
                <div id="reset-password-mail-detail">
                    <ResetPasswordMailDetail email={email} sendMail={sendMail} handleOnChange={handleOnChange} error={error} />
                </div>
            </div>
            <FooterContainer/>
        </>
    )
}
