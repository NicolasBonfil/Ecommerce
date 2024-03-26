import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HeaderContainer } from '../../../HEADER/HeaderContainer.jsx'
import Axios from "axios"
import { ResetPasswordCheckpointDetail } from './ResetPasswordCheckpointDetail.jsx'
import { FooterContainer } from '../../../FOOTER/FooterContainer.jsx'

export const ResetPasswordCheckpointContainer = () => {
    const [error, setError] = useState({})
    const [code, setCode] = useState("")

    const { email } = useParams()

    const sendEmail = () => {
        console.log(email);
        Axios.post("https://ecommerce-1-s9zq.onrender.com/api/sessions/request-password-reset", {email})
        .then(res => {
        })
        .catch(error => {
            setError({"error": error.response.data.message})
        })
    }

    const handleOnChange = (e) => {
        setError({})
        setCode(e.target.value)
    }

    const navigate = useNavigate()

    const confirmCode = () => {
        Axios.post("https://ecommerce-1-s9zq.onrender.com/api/sessions/request-password-reset/checkpoint", {code})
        .then(() => {
            navigate("/reset-password")
        })
        .catch(error => {
            if(!code) return setError({"mail": "Completa este campo"})
            setError({"error": error.response.data.message})
        })
    }


    return (
        <>
            <HeaderContainer/>        
            <div id='reset-password-checkpoint-container' className='container-fluid'>
                <div id='reset-password-checkpoint-detail'>
                    <ResetPasswordCheckpointDetail sendEmail={sendEmail} handleOnChange={handleOnChange} confirmCode={confirmCode} error={error} email={email}/>
                </div>
            </div>
            <FooterContainer/>
        </>
    )
}
