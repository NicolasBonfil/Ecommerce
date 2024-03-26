import { useState } from 'react'
import { HeaderContainer } from '../../../HEADER/HeaderContainer.jsx'
import Axios from "axios"
import { useNavigate } from 'react-router-dom'
import { ResetPasswordDetail } from './ResetPasswordDetail.jsx'
import { FooterContainer } from '../../../FOOTER/FooterContainer.jsx'

export const ResetPasswordContainer = () => {
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })

    const handleOnChange = (e) => {
        setErrors({})

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    const resetPassword = () => {
        Axios.put("http://localhost:8080/api/sessions/reset-password", formData)
        .then(() => {
            navigate("/")
        })
        .catch(error => {
            const formErrors = {};
            for (const key in formData) {
            if (!formData[key]) {
                formErrors[key] = error.response.data.message;
            }
            }
              
            if(Object.keys(formErrors).length === 0){
                formErrors.error = error.response.data.message
            }

            setErrors(formErrors);
        })
    }

    const [showPass, setShowPass] = useState(false)
    const [showPass2, setShowPass2] = useState(false)

    return (
        <>
            <HeaderContainer/>
            <div id='reset-password-container' className='container-fluid p-5'>
                <div id='reset-password-detail'>
                    <ResetPasswordDetail handleOnChange={handleOnChange} resetPassword={resetPassword} errors={errors} formData={formData} setShowPass={setShowPass} setShowPass2={setShowPass2} showPass={setShowPass} showPass2={showPass2}/>
                </div>
            </div>
            <FooterContainer/>
        </>
    )
}
