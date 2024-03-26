import { useState } from "react"
import { AddressForm } from "./AddressForm.jsx"
import { UserAddresses } from "./UserAddresses.jsx"
import { useAddressContext } from "../../../Context/AddressContext.jsx"

export const CheckoutAddressContainer = ({user, errors}) => {
    const {address, setAddress} = useAddressContext()

    const handleOnChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const [selectedAddress, setSelectedAddress] = useState(null);

    const selectAddress = (e) => {
        const parsedAddress = JSON.parse(e.target.value)
        if(selectedAddress == parsedAddress.addressCode) return setSelectedAddress("")
        setSelectedAddress(parsedAddress.addressCode)
        
        setAddress({
            street: parsedAddress.street,
            streetNumber: parsedAddress.streetNumber,
            complement: parsedAddress.complement,
            neighborhood: parsedAddress.neighborhood,
            province: parsedAddress.province,
            city: parsedAddress.city,
            postalCode: parsedAddress.postalCode,
            name: "",
            addressCode: parsedAddress.addressCode
        })
    }


    return (
            <>

                <div className='order-info'>

                    <h1>3- ENTREGA</h1>

                    {
                        (user.addresses && user.addresses.length > 0) ?
                            <div id='user-addresses'>
                                <UserAddresses user={user} selectAddress={selectAddress} selectedAddress={selectedAddress}/>
                            </div>
                        :
                            ""
                    }

                    {
                        selectedAddress?
                            ""
                        :
                            <div id='address-form-container'>
                                <AddressForm errors={errors} address={address} handleOnChange={handleOnChange}/>
                            </div>
                    }
                    <div className='address-form-input'>
                        <label>Quien recibe el pedido</label>
                        <input type="text" name='name' value={address.name} className={errors.name? "error-input" : "success-input"} onChange={handleOnChange}/>
                        {errors.name? <p className='error-message'>{errors.name}</p> : "" }
                    </div>
                </div>
            </>
    )
}
