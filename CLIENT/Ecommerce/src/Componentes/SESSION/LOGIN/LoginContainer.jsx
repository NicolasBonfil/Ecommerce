import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import { LoginDetail } from "./LoginDetail.jsx"
import { HeaderContainer } from "../../HEADER/HeaderContainer.jsx"
import { FooterContainer } from "../../FOOTER/FooterContainer.jsx"

export const LoginContainer = () => {
    const [formData, setFormData] = useState({
		email: "",
		password: ""
    })

    const [errors, setErrors] = useState({})


    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setErrors({})

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const login = () => {
      Axios.post("http://localhost:8080/api/sessions/login", formData)
		.then((res) => {
			navigate("/")
		})
		.catch((error) => {
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

    return (
        <>
            <HeaderContainer/>
            <div id="login-container" className="container-fluid p-5">
                <LoginDetail formData={formData} handleOnChange={handleOnChange} errors={errors} login={login} showPass={showPass} setShowPass={setShowPass}/>
            </div>
            <FooterContainer/>
        </>
    )
}
