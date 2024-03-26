import { Link } from 'react-router-dom'

export const ResetPasswordCheckpointDetail = ({sendEmail, handleOnChange, error, confirmCode, email}) => {
    return (
        <>
            <div id='reset-password-checkpoint-header'>
                <h1>Introduce el codigo de verificación de 5 digitos</h1>
                <p>Consulta el codigo de verificación en <strong>{email}</strong>. <Link to="/reset-password/mail">Cambiar</Link>.</p>
            </div>
            <div id='reset-password-checkpoint-form-container'>
                <div id='reset-password-checkpoint-form'>
                    <div className='reset-password-checkpoint-form-input'>
                        <input type="text" placeholder='Codigo de 5 digitos' className={error.mail? "error-input" : "success-input"} onChange={handleOnChange}/>
                        {error.mail? <p className="error-message" style={{alignSelf: "start"}}>{error.mail}</p> : "" }
                        <button onClick={sendEmail}>Reenviar codigo</button>
                    </div>
                </div>
                {error.error? <p className="error-message" style={{alignSelf: "start"}}>{error.error}</p> : "" }
                <button className="btn btn-primary mt-3" onClick={confirmCode}>Confirmar</button>
            </div>
        </>
    )
}
