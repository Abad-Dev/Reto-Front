import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import React from "react";
import { getProducts } from "../../utils";
import { Product } from "../../models/Product";
import { ProductComponent } from "../../components/Product";
import "./Products.css";

function Products() {
    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState<Product[]>([])
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res: Product[] = await getProducts();
                setProducts(res)
            } catch (error){
                alert(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [])
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
            
            <div className="row">
                {loading ? <div className="container-fluid d-flex flex-column align-items-center justify-content-center my-5 py-5">
                    <Loader />
                    <p className="text-center mt-5">Obteniendo Productos...</p>
                </div> : <div className="col-12">
                    <div className="products-container">
                        {products.map(product => <ProductComponent key={product.id} product={product}/>)}
                    </div>
                </div>
                }
            </div>

        </div>
    )
}

export { Products };