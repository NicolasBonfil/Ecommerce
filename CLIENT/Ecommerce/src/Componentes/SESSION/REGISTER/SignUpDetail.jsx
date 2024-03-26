import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export const SignUpDetail = ({handleOnChange, errors, formData, signup, showPass, setShowPass, showPass2, setShowPass2}) => {
    return (
        <div id="signup-detail">
                <h1>Registrarse</h1>

                <div className='nav-tab'>
                    <div className='nav-tab-item'>
                        <Link to="/login">
                            Iniciar Sesión
                        </Link>
                    </div>
                    <div className='nav-tab-item active'>Registrarme</div>
                </div>

                <div id="signup-form-container">
                    <form id="signup-form">
                    <div className="signup-form-input">
                            <label>Nombre</label>
                            <input type="text" name="first_name" value={formData.first_name} className={errors.first_name? "error-input" : "success-input"} onChange={handleOnChange}/>
                            {errors.first_name? <p className="error-message">{errors.first_name}</p> : "" }
                        </div>
                        <div className="signup-form-input">
                            <label>Apellido</label>
                            <input type="text" name="last_name" value={formData.last_name} className={errors.last_name? "error-input" : "success-input"} onChange={handleOnChange}/>
                            {errors.last_name? <p className="error-message">{errors.last_name}</p> : "" }
                        </div>
                        <div className="signup-form-input">
                            <label>Usuario</label>
                            <input type="text" name="email" value={formData.email} className={errors.email? "error-input" : "success-input"} onChange={handleOnChange}/>
                            {errors.email? <p className="error-message">{errors.email}</p> : "" }
                        </div>
                        <div className="signup-form-input">
                            <FontAwesomeIcon className='password-eye' icon={faEye} onClick={()=>setShowPass(!showPass)}/>
                            <label>Contraseña</label>
                            <input type={showPass? "text" : "password"} autocomplete="off" name="password" value={formData.password} className={errors.password? "error-input" : "success-input"} onChange={handleOnChange}/>
                            {errors.password? <p className="error-message">{errors.password}</p> : "" }
                        </div>
                        <div className="signup-form-input">
                            <FontAwesomeIcon className='password-eye' icon={faEye} onClick={()=>setShowPass2(!showPass2)}/>
                            <label>Confirmar contraseña</label>
                            <input type={showPass2? "text" : "password"} autocomplete="off" name="confirmPassword" value={formData.confirmPassword} className={errors.confirmPassword? "error-input" : "success-input"} onChange={handleOnChange}/>
                            {errors.confirmPassword? <p className="error-message">{errors.confirmPassword}</p> : "" }
                        </div>
                        <div className="signup-form-input">
                            <label>Telefono</label>
                            <input type="text" name="phone" value={formData.phone} className={errors.phone? "error-input" : "success-input"} onChange={handleOnChange}/>
                            {errors.phone? <p className="error-message">{errors.phone}</p> : "" }
                        </div>
                    </form>
                    {errors.error? <p className="error-message" style={{alignSelf: "start"}}>{errors.error}<br/></p> : "" }
                    <button className="btn btn-dark w-25 mt-4" onClick={signup}>Crear Cuenta</button>
                </div>
            </div>
    )
}
