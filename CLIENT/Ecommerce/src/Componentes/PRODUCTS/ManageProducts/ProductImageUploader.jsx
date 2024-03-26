import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const ProductImageUploader = ({errors, images, addImage, deleteImage}) => {
    const inputRef = useRef()

    const handleInputClick = () => {
        inputRef.current.click()
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const image = e.dataTransfer.files[0]
        addImage(image)
        inputRef.current.value = '';
    }

    const handleOnChange = (e) => {
        const image = e.target.files[0]
        addImage(image)
        inputRef.current.value = '';
    }

    return (
        <div id='product-image-uploader'>
            <div id='uploader-body' onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleInputClick}>
                <h1 id='uploader-title'>Arrastrá y soltá para añadir una foto</h1>
                <img src="/foto-subir-imagen.png" alt="uploader-image" id='uploader-image'/>
                <button className='btn btn-primary w-25' onClick={handleInputClick}>Subir imagen</button>
                <input type="file" name="file" ref={inputRef} accept="image/*" hidden onInput={handleOnChange}/>
            </div>
            {
                images.length > 0?
                <div id='uploaded-images'>
                    {
                        images.map(imageName => {
                            let url = `http://localhost:8080/products/images/${imageName}`;
                            return(
                                <div className='uploaded-image' key={imageName}>
                                    <button className='delete-image' onClick={() => deleteImage(imageName)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                    <img src={url} alt="uploaded-image" className='img-fluid'/>
                                </div>
                            )
                        })
                    }
                </div>
                :
                ""
            }
            { errors.images? <p className='error-message mt-4'>{errors.images}</p> : "" }
        </div>
    )
}
