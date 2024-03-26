import { createContext, useContext, useState } from "react";
import Axios from "axios"

const AddressContext = createContext()

export const useAddressContext = () => useContext(AddressContext)

export const AddressContextProvider = ({children}) => {
    const [address, setAddress] = useState({
        street: "",
        streetNumber: "",
        complement: "",
        neighborhood: "",
        province: "",
        city: "",
        postalCode: "",
        name: ""
    })


    return(
        <AddressContext.Provider value={{
            address,
            setAddress

        }}>
            {children}
        </AddressContext.Provider>
    )
}