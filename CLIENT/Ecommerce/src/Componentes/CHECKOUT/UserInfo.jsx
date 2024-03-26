import React from 'react'

export const UserInfo = ({user, logout}) => {
    return (
        <>
            <div className='order-info'>
                <h1>1- EMAIL</h1>
                <p>{user.email}</p>
            </div>

            <div className='order-info'>
                <h1>2- DATOS PERSONALES</h1>
                <p>{user.email} - <strong className="checkout-logout" onClick={logout}>No soy yo, cerrar sesión</strong></p>
                <p>Nombre: {user.first_name} {user.last_name}</p>
                <p>Teléfono: {user.phone}</p>
            </div>
        </>
    )
}
