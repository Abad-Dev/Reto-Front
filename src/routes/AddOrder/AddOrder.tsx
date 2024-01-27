import React from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductsModal } from '../../components/ProductsModal';

function AddOrder() {
    const [mode, setMode] = React.useState("");
    const [modalOpened, setModalOpened] = React.useState(false);
    const guid = uuidv4();
    console.log("render");
    let { id } = useParams();

    React.useEffect(() => {
        if (id != undefined) {
            setMode("edit")
            document.title = "Edit Order";
        } else {
            setMode("add")
            document.title = "Add Order";
        }
    }, [id])

    const handleAddProduct = (e: any) => {
        e.preventDefault();
        setModalOpened(true);
    }

    const closeModal = () => {
        setModalOpened(false);
    }

    return (
        <div className="container">
            {modalOpened ? <ProductsModal closeModal={closeModal} /> : ""}
            <h2 className='mb-3'>{mode == "add" ? "Add Order" : "Edit Order"}:</h2>
            <form>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <label># de Orden:</label>
                        <input className="form-control" type="text" value={mode == "add" ? guid : ""} readOnly/>
                    </div>

                    <div className="col-12 col-md-6">
                        <label>Fecha:</label>
                        <input className="form-control" type="text" value={new Date().toLocaleString()} disabled readOnly/>
                    </div>

                    <div className="col-12 mt-3">
                        <label>Productos</label>
                        <div className="products-container border rounded" style={{minHeight: "200px"}}>

                        </div>
                    </div>

                    <div className="col-12 mt-2">
                        <button className='btn btn-primary' onClick={(e) => handleAddProduct(e)}>
                            + Agregar
                        </button>
                    </div>
                </div>
            </form>
            <hr />
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <button className='btn btn-save'>
                        Guardar y Crear
                    </button>
                </div>
            </div>
        </div>
    )
}

export { AddOrder };