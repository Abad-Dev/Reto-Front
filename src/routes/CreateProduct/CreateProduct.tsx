import React from "react";
import { createProduct } from "../../utils";
import { Product } from "../../models/Product";
import { Loader } from "../../components/Loader";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
    const navigate = useNavigate();

    const [product, setProduct] = React.useState<Product>({
        image: "",
        name: "",
        price: 0,
        qtyInStock: 0
    })

    const [loading, setLoading] = React.useState<Boolean>(false);
    const [priceError, setPriceError] = React.useState<string>("");
    const [qtyError, setQtyError] = React.useState<string>("");

    const handleCreateProduct = () => {
        if (Number(product.price) < 0) {
            setPriceError("The prices can not be negatives.");
            return;
        }
        if (Number(product.qtyInStock) < 0) {
            setQtyError("The quantity can not be negative.");
            return;
        }
        setLoading(true)
        createProduct(product)
            .then(_ => {
                navigate("/products");
            })
            .catch(err => alert(err))
    }
    return(
        <div className="container">
            {loading ? <div className="modal-container d-flex align-items-center justify-content-center">
                <Loader />
            </div> : ""}
            <h2 className="mb-3"> Create Product:</h2>
            <form>
                <div className="row mb-3">
                    <div className="col-7">
                        <label>Image (url):</label>
                        <input type="text" className="form-control" onChange={(e) => setProduct(prevProduct => ({...prevProduct, ["image"]: e.target.value}))} />
                    </div>
                    <div className="col-5"> 
                        {product.image.length > 0 ?
                        <img src={product.image} alt="..." />
                        :""
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <label>Name:</label>
                        <input type="text" className="form-control" onChange={(e) => setProduct(prevProduct => ({...prevProduct, ["name"]: e.target.value}))} />
                    </div>
                    <div className="col-6 col-md-3">
                        <label>Price:</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">S/.</span>
                            <input type="number" className="form-control" onChange={(e) => {setProduct(prevProduct => ({...prevProduct, ["price"]: parseInt(e.target.value)})); setPriceError("")}}/>
                            <p className="text-danger">
                                {priceError}
                            </p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <label>Qty in Stock:</label>
                        <input type="number" className="form-control" onChange={(e) => {setProduct(prevProduct => ({...prevProduct, ["qtyInStock"]: parseInt(e.target.value)})); setQtyError("")}}/>
                        <p className="text-danger">
                            {qtyError}
                        </p>
                    </div>
                </div>
            </form>
            <hr />
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-save" onClick={() => handleCreateProduct()}>
                        Save and Create
                    </button>
                </div>
            </div>
        </div>
    )
}

export { CreateProduct };