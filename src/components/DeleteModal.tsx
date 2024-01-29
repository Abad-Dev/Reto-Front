function DeleteModal({ handleDelete, closeModal, text } : { handleDelete: Function, closeModal: Function, text: string }) {
    return(
        <div className="modal-container d-flex align-items-center justify-content-center">
            <div className="bg-white rounded p-5 mx-2 d-flex flex-column align-items-center">
                <p className="mb-4 text-center">{text}</p>
                <div className="d-flex">
                    <button className="btn btn-primary me-2" onClick={() => closeModal()}>Cancel</button>
                    <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export { DeleteModal };