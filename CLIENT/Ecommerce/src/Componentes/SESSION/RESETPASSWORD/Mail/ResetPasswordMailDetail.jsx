import React from 'react'

export const ResetPasswordMailDetail = ({email, handleOnChange, error, sendMail}) => {
    return (
        <>
            <div id="reset-password-mail-detail-header">
                <h1>Recuperar Contraseña</h1>
                <p className="m-0">Ingresá tu correo electrónico para recuperar tu cuenta</p>
            </div>
            <div id="reset-password-mail-detail-body">
                <form id="reset-password-form">
                    <div className="reset-password-form-input">
                        <input type="text" name="email" value={email} onChange={handleOnChange} className={error.mail? "error-input" : "success-input"}/>
                        {error.mail? <p className="error-message">{error.mail}</p> : "" }
                    </div>
                </form>
                {error.error? <p className="error-message" style={{alignSelf: "start"}}>{error.error}</p> : "" }
                <button className="btn btn-primary mt-2" onClick={sendMail}>Confirmar</button>
            </div>
        </>
    )
}
