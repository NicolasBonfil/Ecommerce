export const ProductForm = ({errors, formData, handleOnChange}) => {
    return (
        <form>
            <div className='product-form-input'>
                <label>Titulo</label>
                <input type="text" className={errors.title? "error-input" : "success-input"} name="title" value={formData.title} onChange={handleOnChange}/>
                { errors.title? <p className="error-message">{errors.title}</p> : "" }
            </div>

            <div className='product-form-input'>
                <label>Descripción</label>
                <input type="text" className={errors.description? "error-input" : "success-input"} name="description" value={formData.description} onChange={handleOnChange}/>
                { errors.description? <p className="error-message">{errors.description}</p> : "" }
            </div>

            <div className='product-form-input'>
                <label>Categoría</label>
                <input type="text" className={errors.category? "error-input" : "success-input"} name="category" value={formData.category} onChange={handleOnChange}/>
                { errors.category? <p className="error-message">{errors.category}</p> : "" }
            </div>

            <div className='product-form-input'>
                <label>Marca</label>
                <input type="text" className={errors.brand? "error-input" : "success-input"} name="brand" value={formData.brand} onChange={handleOnChange}/>
                { errors.brand? <p className="error-message">{errors.brand}</p> : "" }
            </div>

            <div className='product-form-input'>
                <label>Precio</label>
                <input type="text" className={ errors.price? "error-input product-form-input-number" : "product-form-input-number success-input" } name="price" value={formData.price} onChange={handleOnChange}/>
                { errors.price? <p className="error-message">{errors.price}</p> : "" }
            </div>

            <div className='product-form-input'>
                <label>Stock</label>
                <input type="text" className={ errors.stock? "error-input product-form-input-number" : "product-form-input-number success-input" } name="stock" value={formData.stock} onChange={handleOnChange}/>
                { errors.stock? <p className="error-message">{errors.stock}</p> : "" }
            </div>
        </form>
    )
}
