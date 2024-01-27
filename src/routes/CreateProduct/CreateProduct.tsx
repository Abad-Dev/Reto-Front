import React from "react";

function CreateProduct() {
    const [img, setImg] = React.useState("");
    const [name, setName] = React.useState("");
    return(
        <div className="container">
            <h2 className="mb-3"> Create Product:</h2>
            <form>
                <div className="row mb-3">
                    <div className="col-7">
                        <label>Image (url):</label>
                        <input type="text" className="form-control" onChange={(e) => {setImg(e.target.value)}} />
                    </div>
                    <div className="col-5">
                        <img src={img} alt="..." />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <label>Name:</label>
                        <input type="text" className="form-control" onChange={(e) => {setName(e.target.value)}} />
                    </div>
                    <div className="col-12 col-md-6">
                        <label>Price:</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">S/.</span>
                            <input type="number" className="form-control"/>
                        </div>
                    </div>
                </div>
            </form>
            <hr />
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-save">
                        Guardar y Crear
                    </button>
                </div>
            </div>
        </div>
    )
}

export { CreateProduct };