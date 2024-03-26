import "./hojas-de-estilo/header.css"
import "./hojas-de-estilo/products.css"
import "./hojas-de-estilo/session.css"
import "./hojas-de-estilo/loading.css"
import "./hojas-de-estilo/cart.css"
import "./hojas-de-estilo/carousel.css"
import "./hojas-de-estilo/checkout.css"
import "./hojas-de-estilo/footer.css"


import { Navigate, Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Axios from "axios"

import { ProductsSection } from './Componentes/PRODUCTS/ProductsSection/ProductsSection.jsx'
import { AddProductsContainer } from './Componentes/PRODUCTS/ManageProducts/AddProductsContainer.jsx'
import { EditProductsContainer } from './Componentes/PRODUCTS/ManageProducts/EditProductsContainer.jsx'
import { LoginContainer } from "./Componentes/SESSION/LOGIN/LoginContainer.jsx"
import { SignUpContainer } from "./Componentes/SESSION/REGISTER/SignUpContainer.jsx"
import { ResetPasswordMailContainer } from "./Componentes/SESSION/RESETPASSWORD/Mail/ResetPasswordMailContainer.jsx"
import { ProfileContainer } from "./Componentes/SESSION/PROFILE/ProfileContainer.jsx"
import { MainContainer } from "./Componentes/MAIN/MainContainer.jsx"
import { ResetPasswordCheckpointContainer } from "./Componentes/SESSION/RESETPASSWORD/CheckPoint/ResetPasswordCheckpointContainer.jsx"
import { ResetPasswordContainer } from "./Componentes/SESSION/RESETPASSWORD/Form/ResetPasswordContainer.jsx"
import { ProductDetailContainer } from "./Componentes/PRODUCTS/ProductDetail/ProductDetailContainer.jsx"
import { CartContainer } from "./Componentes/CART/CartContainer.jsx"
import { CheckoutContainer } from "./Componentes/CHECKOUT/CheckoutContainer.jsx"
import { AddressContextProvider } from "./Context/AddressContext.jsx"
import { FilterContextProvider } from "./Context/FilterContext.jsx"

Axios.defaults.withCredentials = true

function App() {
  return (
	<>
		<Router>
			<Routes>
				<Route path='*' element = {<Navigate to="/"/>} />
				<Route path='/' element = {<MainContainer/>} />
				<Route path='/products-section' element = {<FilterContextProvider><ProductsSection/></FilterContextProvider>} />
				<Route path='/add-product' element={<AddProductsContainer/>} />
				<Route path='/edit-product/:pid' element={<EditProductsContainer/>} />
				<Route path='/product/detail/:pid' element={<ProductDetailContainer/>} />
				<Route path='/login' element={<LoginContainer/>} />
				<Route path='/signup' element={<SignUpContainer/>} />
				<Route path='/profile' element={<ProfileContainer/>} />
				<Route path='/reset-password/mail' element={<ResetPasswordMailContainer/>} />
				<Route path='/reset-password/checkpoint/:email' element={<ResetPasswordCheckpointContainer/>} />
				<Route path='/reset-password' element={<ResetPasswordContainer/>} />
				<Route path='/cart' element={<CartContainer/>} />
				<Route path='/checkout' element={<AddressContextProvider><CheckoutContainer/></AddressContextProvider>} />				
			</Routes>
		</Router>
	</>
  )
}

export default App
