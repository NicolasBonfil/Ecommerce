import { censurarNumero, censurarTexto } from "../../../utils/Censurar.js" 

export const UserAddresses = ({user, selectAddress, selectedAddress}) => {
    return (
        <>
            <label>Mis direcciones</label>
            {
                user.addresses.map(address => {
                    return (
                        <div className="user-address" key={address.street}>
                            <input type="checkbox" id={address.code} onChange={selectAddress} checked={selectedAddress == address.addressCode} value={JSON.stringify(address)}/>
                            <label className="user-address-info" htmlFor={address.code}>
                                <p>{censurarTexto(address.street, 50)} {censurarNumero(address.streetNumber)}</p>
                                <p>{censurarNumero(address.postalCode)}</p>
                                <p>{censurarTexto(address.neighborhood, 50)}, {address.city}</p>
                            </label>
                        </div>
                    )
                })
            }
        </>
    )
}
