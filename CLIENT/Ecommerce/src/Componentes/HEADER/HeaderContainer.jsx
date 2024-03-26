import { useEffect, useState } from 'react'
import { HeaderAdd } from "./HeaderAdd.jsx"
import { HeaderButtons } from "./HeaderButtons.jsx"
import { HeaderLogo } from "./HeaderLogo.jsx"
import { HeaderNavbar } from "./HeaderNavbar.jsx"
import Axios from "axios"

export const HeaderContainer = () => {
    const [isLog, setIsLog] = useState(false)

    useEffect(() => {
        Axios.get("http://localhost:8080/api/users/isLog")
        .then((res) => {
            setIsLog(res.data)
        })
    }, [])

    return (
        <header>
            <div id='header-add'>
                <HeaderAdd/>
            </div>

            <div id='header-body'>
                <div id='logo-container'>
                    <HeaderLogo/>
                </div>

                <div id='navbar-container'>
                    <HeaderNavbar/>
                </div>

                <div id='buttons-container'>
                    <HeaderButtons isLog={isLog}/>
                </div>
            </div>
        </header>
    )
}
