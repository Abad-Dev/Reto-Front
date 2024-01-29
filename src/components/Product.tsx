import React from "react";
import { Product } from "../models/Product";
import "./Product.css";
import { Loader } from "./Loader";
import { DeleteModal } from "./DeleteModal";

function ProductComponent({ product, deleteProduct }: { product: Product, deleteProduct: Function }) {
    const [erasing, setErasing] = React.useState<boolean>(false);
    const [modalOpened, setModalOpened] = React.useState<boolean>(false);

    const handleDelete = () => {
        setErasing(true); 
        deleteProduct(product.id);
    }
    return (
    <div className="product-container">
        {modalOpened ? 
            <DeleteModal handleDelete={handleDelete} closeModal={() => setModalOpened(false)} text="Are you sure you want to delete this product?"/> 
        : ""}
        <small className="w-100 text-center">Id: {product.id}</small>
        <hr className="mt-1 mb-2"/>
        {erasing ? 
        <div className="w-100 d-flex justify-content-center align-align-items-center">
            <Loader />
        </div>
        :
        <div className="product-wrapper">
           <img src={product.image} />
            <div className="text-container">
                <p className="text-decoration-underline">{product.name}</p>
                <p>S/ {product.price.toFixed(2)}</p>
            </div>
            <b>
                x{JSON.stringify(product.qtyInStock)}
            </b>
            <button className="btn btn-danger ms-2" onClick={() => setModalOpened(true)}>
                <i className="bi bi-trash-fill"></i>
            </button>
        </div>
        }
    </div>
    )
}

export { ProductComponent }