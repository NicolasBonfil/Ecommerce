export const AddressForm = ({address, errors, handleOnChange}) => {
    return (
            <>
                <form id='address-form'>
                    <div className='address-form-input'>
                        <label>Calle</label>
                        <input type="text" name='street' value={address.street} className={errors.street? "error-input" : "success-input"} onChange={handleOnChange}/>
                        {errors.street? <p className='error-message'>{errors.street}</p> : "" }
                    </div>

                    <div className='address-form-input'>
                        <label>Numero</label>
                        <input type="text" name='streetNumber' value={address.streetNumber} className={errors.streetNumber? "error-input" : "success-input"} onChange={handleOnChange}/>
                        {errors.streetNumber? <p className='error-message'>{errors.streetNumber}</p> : "" }

                    </div>

                    <div className='address-form-input'>
                        <label>Código Postal</label>
                        <input type="text" name='postalCode' value={address.postalCode} className={errors.postalCode? "error-input" : "success-input"} onChange={handleOnChange}/>
                        {errors.postalCode? <p className='error-message'>{errors.postalCode}</p> : "" }
                    </div>

                    <div className='address-form-input'>
                        <label>Piso/Departamento/Lote (opcional)</label>
                        <input type="text" name='complement' value={address.complement} className="success-input" onChange={handleOnChange}/>
                    </div>

                    <div className='address-form-input'>
                        <label>Barrio</label>
                        <input type="text" name='neighborhood' value={address.neighborhood} className={errors.neighborhood? "error-input" : "success-input"} onChange={handleOnChange}/>
                        {errors.neighborhood? <p className='error-message'>{errors.neighborhood}</p> : "" }
                    </div>

                    <div className='address-form-input'>
                        <label>Provincia</label>
                        <input type="text" name='province' value={address.province} className={errors.province? "error-input" : "success-input"} onChange={handleOnChange}/>
                        {errors.province? <p className='error-message'>{errors.province}</p> : "" }
                    </div>

                    <div className='address-form-input'>
                        <label>Ciudad</label>
                        <input type="text" name='city' value={address.city} className={errors.city? "error-input" : "success-input"} onChange={handleOnChange}/>
                        {errors.city? <p className='error-message'>{errors.city}</p> : "" }
                    </div>
                </form>
            </>
    )
}
