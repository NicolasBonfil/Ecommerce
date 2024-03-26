import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductForm } from './ProductForm.jsx';
import { ProductImageUploader } from './ProductImageUploader.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from "axios"
import { HeaderContainer } from '../../HEADER/HeaderContainer.jsx';
import { FooterContainer } from '../../FOOTER/FooterContainer.jsx';

export const EditProductsContainer = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        images: []
    })
    
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const addImage = (image) => {
        const form = new FormData();
        form.append('image', image);
        
        const formErrors = {}

        if(formData.images.includes(image.name)) formErrors.images = `Ya existe una imagen con el nombre: "${image.name}"`;
        if(formData.images.length == 3) formErrors.images = "Alcanzaste el limite de fotos (3)"

        if(Object.keys(formErrors).length > 0) return setErrors(formErrors);

        Axios.post("https://ecommerce-1-s9zq.onrender.com/api/products/upload-image", form)
        .then(() => {
            setErrors({})
            const images = formData.images
            images.push(image.name)
            setFormData({...formData, "images": images})
        })
        .catch(error => {
            formErrors.error = error.response.data.message
            setErrors(formErrors)
        })
    }

    const deleteImage = (imageName) => {
        Axios.delete(`https://ecommerce-1-s9zq.onrender.com/api/products/delete-image/${imageName}`)
        .then(() => {
            setErrors({})
            const images = formData.images
            const index = images.findIndex(image => image === imageName)
            images.splice(index, 1)
    
            setFormData({...formData, "images": images})
        })
        .catch(error => {
            const formErrors = {}
            formErrors.error = error.response.data.message
            setErrors(formErrors)
        })
    }

    const {pid} = useParams()

    useEffect(() => {
        Axios.get(`https://ecommerce-1-s9zq.onrender.com/api/products/${pid}`)
        .then(result => {
            setFormData({
                title: result.data.title,
                description: result.data.description,
                price: result.data.price.toLocaleString("ES-AR"),
                stock: result.data.stock.toLocaleString(),
                category: result.data.category,
                brand: result.data.brand,
                images: result.data.images
            })
        })
    }, [pid])


    const handleOnChange = (e) => {
        setErrors({})

        if(e.target.name == "price" || e.target.name == "stock"){
            e.target.value = e.target.value.replace(/\D/g, '');
            e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const editProduct = (e) => {
        e.preventDefault()

        Axios.put(`https://ecommerce-1-s9zq.onrender.com/api/products/${pid}`, formData)
        .then(() => {
            navigate("/products-section")
        })
        .catch(error => {
            const formErrors = {};
            for (const key in formData) {
              if (!formData[key] || formData[key].length == 0) {
                formErrors[key] = error.response.data.message;
              }
            }

            if(formData.price && formData.price < 1) formErrors.price = "El precio debe ser mayor a 0"
            
            if(Object.keys(formErrors).length === 0){
                formErrors.error = error.response.data.message
            }

            setErrors(formErrors);
        })
    }


    return (
        <>
            <HeaderContainer/>
            <div id='edit-product-container' className='container-fluid p-4 d-flex flex-column'>
                <div id='product-form' className='container-fluid mb-5'>
                    <ProductForm formData={formData} handleOnChange={handleOnChange} errors={errors}/>
                </div>

                <div id='product-image-uploader-container' className='container-fluid d-flex align-items-center justify-content-center mt-5'>
                    <ProductImageUploader addImage={addImage} deleteImage={deleteImage} errors={errors} images={formData.images}/>
                </div>
                {errors.error? <p className='error-message'>{errors.error}</p> : ""}
                <button className='btn btn-dark w-25 mt-4' style={{alignSelf: "center"}} onClick={editProduct}>Editar Producto</button>
            </div>
            <FooterContainer/>
        </>
    )
}
