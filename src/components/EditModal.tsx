import React, { ChangeEvent } from "react";
import "./ProductsModel.css";
import { Product } from "../models/Product";
import { Detail } from "../models/Detail";

function EditModal({ closeModal, products, detail, saveChanges  } : { closeModal: Function, products: Product[], detail: Detail, saveChanges: Function}){
    const selectedProduct = products.find(prod => prod.id == detail.productId)!
    const [qty, setQty] = React.useState<Number>(detail.qty);
    const [error, setError] = React.useState<string>("");
    const handleSave = () => {
        if (Number(qty) > Number(Number(selectedProduct.qtyInStock) + Number(detail.qty))) {
            setError("You can't order more than what's in stock.");
            return;
        }
        if (Number(qty) <= 0) {
            setError("You have to order at least 1 Product");
            return;
        }
        closeModal();
        saveChanges({
            productId: selectedProduct.id,
            qty: qty
        })
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
                    <h3 className="text-center">Edit Product</h3>
                    <hr />
                    <button onClick={() => closeModal()} type="button" className="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="row w-100" style={{flexGrow: "1", overflowY: "auto"}}>
                    <form>
                        <div className="col-12 mb-4">
                            <label>Select Product:</label>
                            <select className="form-control" disabled value={detail.productId}>
                                {products.map(product => (
                                    <option value={product.id} key={product.id} disabled={product.qtyInStock == 0} >{product.name}</option>
                                ))}
                            </select>
                            <p className="mt-1 text-secondary">
                                {selectedProduct ? "Available in stock: " + Number(Number(selectedProduct.qtyInStock) + Number(detail.qty)) : ""}
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
                </div>
                <div className="row py-2 w-100 d-flex justify-content-center">
                    <hr></hr>
                    <button className="btn btn-save" onClick={() => handleSave()}>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    )
}

export { EditModal };