import { Link } from "react-router-dom"
import { AddProductItem } from "./AddProductItem.jsx"
import { DeleteProductButton } from "./Buttons/DeleteProductButton.jsx"
import { EditProductButton } from "./Buttons/EditProductButton.jsx"
import { Item } from "./Item.jsx"

export const ProductsItemList = ({isAdmin, products, deleteProduct}) => {
    return (
        <>
            {
                products.map(product => {
                    return(
                        <div className="item-container" key={product._id}> 
                            <div className='item' id={product._id}>
                                <Link to={`/product/detail/${product._id}`} className='item-detail-link'>
                                    <Item product={product}/>
                                </Link>
                                {isAdmin?
                                    <>
                                        <div id="item-buttons">
                                            <EditProductButton id={product._id}/>
                                            <DeleteProductButton id={product._id} deleteProduct={deleteProduct}/>
                                        </div>
                                    </>
                                    :
                                        ""
                                }
                            </div>
                        </div>
                    )
                })
            }
            {isAdmin ? <AddProductItem/> : ""}
        </>
    )
}
