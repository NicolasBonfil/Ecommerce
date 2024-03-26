import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from "axios"
import { SignUpDetail } from './SignUpDetail.jsx'
import { HeaderContainer } from '../../HEADER/HeaderContainer.jsx'
import { FooterContainer } from '../../FOOTER/FooterContainer.jsx'

export const SignUpContainer = () => {
    const [formData, setFormData] = useState({
        first_name: "",
		last_name: "",
		email: "",
		password: "",
		confirmPassword: "",
        phone: ""
    })

    const handleOnChange = (e) => {
        if(e.target.name == "phone"){
            e.target.value = e.target.value.replace(/\D/g, '');
        }

        setErrors({})

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

	const navigate = useNavigate()

    const [errors, setErrors] = useState({})

    const signup = () => {
        Axios.post("http://localhost:8080/api/sessions/register", formData)
		.then(result => {
			navigate("/login")
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
            <div id="signup-container" className="container-fluid p-5">
                <SignUpDetail handleOnChange={handleOnChange} formData={formData} signup={signup} errors={errors} showPass={showPass} setShowPass={setShowPass} showPass2={showPass2} setShowPass2={setShowPass2}/>
            </div>
            <FooterContainer/>
        </>
    )
}
