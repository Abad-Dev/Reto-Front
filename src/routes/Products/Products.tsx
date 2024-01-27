import { Link } from "react-router-dom";

function Products() {
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex">
                    <h2 className="mb-0">Productos:</h2>
                    <Link className="ms-auto" to="/add-product">
                        <button className="btn btn-primary">
                            + Agregar Producto
                        </button>
                    </Link>
                </div>
            </div>
            <hr />
            

        </div>
    )
}

export { Products };