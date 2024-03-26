import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export const LoginDetail = ({formData, handleOnChange, errors, login, showPass, setShowPass}) => {
    return (
        <div id="login-detail">
                <h1>Iniciar Sesión</h1>

                <div className='nav-tab'>
                    <div className='nav-tab-item active'>Iniciar Sesión</div>
                    <div className='nav-tab-item'>
                        <Link to="/signup">
                            Registrarme
                        </Link>
                    </div>
                </div>

                <div id="login-form-container">
                    <form id="login-form">
                        <div className="login-form-input">
                            <label>Usuario</label>
                            <input type="text" name="email" value={formData.email} className={errors.email? "error-input" : "success-input"} onChange={handleOnChange}/>
                            {errors.email? <p className="error-message">{errors.email}</p> : "" }
                        </div>
                        <div className="login-form-input">
                            <FontAwesomeIcon className='password-eye' icon={faEye} onClick={()=>setShowPass(!showPass)}/>
                            <label>Contraseña</label>
                            <input type={showPass? "text" : "password"} autocomplete="off" name="password" value={formData.password} className={errors.password? "error-input" : "success-input"} onChange={handleOnChange}/>
                            {errors.password? <p className="error-message">{errors.password}</p> : "" }
                            <Link to="/reset-password/mail" id="reset-password-link">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </form>
                    {errors.error? <p className="error-message" style={{alignSelf: "start"}}>{errors.error}<br/></p> : "" }
                    <button className="btn btn-dark w-50 mt-4" onClick={login}>Iniciar Sesión</button>
                </div>
            </div>
    )
}
