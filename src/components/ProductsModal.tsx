import "./ProductsModel.css";

function ProductsModal({ closeModal } : { closeModal : Function}){
    return(
        <div className="d-flex align-items-center justify-content-center modal-container" >

            <div className="d-flex flex-column align-items-center bg-white container py-2 custom-modal">
                <div className="row w-100 position-relative">
                    <h3 className="text-center">Add Product</h3>
                    <hr />
                    <button onClick={() => closeModal()} type="button" className="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
            </div>
        </div>
    )
}

export { ProductsModal };