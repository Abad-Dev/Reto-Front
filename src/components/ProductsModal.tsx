import React, { ChangeEvent } from "react";
import "./ProductsModel.css";
import { Product } from "../models/Product";
import { Loader } from "./Loader";

function ProductsModal({ closeModal, products, addDetail } : { closeModal: Function, products: Product[], addDetail: Function}){
    const [selectedProduct, setSelectedProduct] = React.useState<Product>();
    const [qty, setQty] = React.useState<Number>(0);
    const [error, setError] = React.useState<string>("");
    const [saving, setSaving] = React.useState<Boolean>(false);
    const handleSave = () => {
        if (!selectedProduct){
            closeModal();
            return;
        }

        if (qty > selectedProduct?.qtyInStock!) {
            setError("You can't order more than what's in stock.");
            return;
        }

        if (Number(qty) <= 0) {
            setError("You have to order at least 1 Product");
            return;
        }

        addDetail(selectedProduct.id, qty);
        closeModal();
    }
    const handleSelect = (e: ChangeEvent) => {
        let input = e.target as HTMLSelectElement
        setSelectedProduct(products.find(prod => prod.id == input.value));
    }

    const handleChangeQty = (e: ChangeEvent) => {
        setError("")
        let input = e.target as HTMLInputElement
        setQty(Number(input.value));
    }
    return(
        <div className="d-flex align-items-center justify-content-center modal-container" >
            <div className="d-flex flex-column align-items-center bg-white container py-2 custom-modal">
                <div className="row w-100 position-relative">
                    <h3 className="text-center">Add Product</h3>
                    <hr />
                    <button onClick={() => closeModal()} type="button" className="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="row w-100" style={{flexGrow: "1", overflowY: "auto"}}>
                    {saving ? 
                    <div className="container-fluid d-flex flex-column align-items-center justify-content-center my-5 py-5">
                        <Loader />
                        <p className="text-center mt-5">Guardando...</p>
                    </div>:
                    <form>
                        <div className="col-12 mb-4">
                            <label>Select Product:</label>
                            <select className="form-control" onChange={(e) => handleSelect(e)}>
                                <option value="" selected hidden>Choose here</option>
                                {products.map(product => (
                                    <option value={product.id} key={product.id} disabled={product.qtyInStock == 0}>{product.name}</option>
                                ))}
                            </select>
                            <p className="mt-1 text-secondary">
                                {selectedProduct ? "Available in stock: " + selectedProduct.qtyInStock : ""}
                            </p>
                        </div>
                        <div className="col-12">
                            <label>Quantity:</label>
                            <input type="number" className="form-control" max={Number(selectedProduct?.qtyInStock) || 0} value={Number(qty)} onChange={(e) => handleChangeQty(e)}  />
                            <p className="text-danger">
                                {error}
                            </p>
                        </div>
                    </form>
                    }
                </div>
                <div className="row py-2 w-100 d-flex justify-content-center">
                    <hr></hr>
                    <button className="btn btn-save" onClick={() => handleSave()} disabled={Boolean(saving)}>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    )
}

export { ProductsModal };