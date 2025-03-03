export const Item = ({product}) => {
    return (
        <>
            <div className='item-image-container'>
                <img src={`http://localhost:8080/products/images/${product.images[0]}`} alt="item-image" className='img-fluid'/>
            </div>
            <div className='item-info-container'>
                <p className='item-category'>{product.category}</p>
                <p className='item-title'>{product.title}</p>
                <p className='item-price'>${(product.price).toLocaleString("es-ar")}</p>
            </div>
        </>
    )
}
