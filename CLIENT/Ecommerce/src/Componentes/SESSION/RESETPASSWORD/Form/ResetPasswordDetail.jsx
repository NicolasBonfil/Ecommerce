import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export const ResetPasswordDetail = ({errors, formData, handleOnChange, resetPassword, setShowPass, setShowPass2, showPass, showPass2}) => {
    return (
        <>
            <form id='reset-password-form'>
                <div className='reset-password-form-input'>
                    <FontAwesomeIcon className='password-eye' icon={faEye} onClick={()=>setShowPass(!showPass)}/>
                    <label>Contraseña</label>
                    <input type={showPass? "text" : "password"} autocomplete="off" name="password" value={formData.password} className={errors.password? "error-input" : "success-input"} onChange={handleOnChange}/>
                    {errors.password? <p className="error-message" style={{alignSelf: "start"}}>{errors.password}</p> : "" }
                </div>
                <div className='reset-password-form-input'>
                    <FontAwesomeIcon className='password-eye' icon={faEye} onClick={()=>setShowPass2(!showPass2)}/>
                    <label>Repetir contraseña</label>
                    <input type={showPass2? "text" : "password"} autocomplete="off" name="confirmPassword" value={formData.confirmPassword} className={errors.confirmPassword? "error-input" : "success-input"} onChange={handleOnChange}/>
                    {errors.confirmPassword? <p className="error-message" style={{alignSelf: "start"}}>{errors.confirmPassword}</p> : "" }
                </div>
            </form>
            {errors.error? <p className="error-message">{errors.error}</p> : "" }
            <button className="btn btn-primary mt-3" style={{alignSelf: "center"}} onClick={resetPassword}>Confirmar</button>
        </>
    )
}
