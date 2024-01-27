import React from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductsModal } from '../../components/ProductsModal';
import { Product } from '../../models/Product';
import { getProducts } from '../../utils';
import { Detail } from '../../models/Detail';
import { DetailComponent } from '../../components/Detail';

function AddOrder() {
    const [mode, setMode] = React.useState<string>("");
    const [modalOpened, setModalOpened] = React.useState<Boolean>(false);
    const [products,setProducts] = React.useState<Product[]>([]);
    const [guid, setGuid] = React.useState<string>("")
    const [details, setDetails] = React.useState<Detail[]>([]);
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

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res: Product[] = await getProducts();
                setProducts(res);
                setGuid(uuidv4());
            } catch (error){
                alert(error);
            }
        }

        fetchData();
    }, [])

    const handleAddProduct = (e: any) => {
        e.preventDefault();
        setModalOpened(true);
    }

    const closeModal = () => {
        setModalOpened(false);
    }

    const handleAddDetail = (productId: string, qty: Number) => {
        setDetails(details => [...details, {
            productId,
            qty
        }])
        
    }

    return (
        <div className="container">
            {modalOpened ? 
            <ProductsModal closeModal={closeModal} products={products} addDetail={handleAddDetail}/> 
            : ""}
            <h2 className='mb-3'>{mode == "add" ? "Add Order" : "Edit Order"}:</h2>
            <form>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <label>Order Number:</label>
                        <input className="form-control" type="text" value={mode == "add" ? guid : ""} readOnly/>
                    </div>

                    <div className="col-12 col-md-6">
                        <label>Date:</label>
                        <input className="form-control" type="text" value={new Date().toLocaleString()} disabled readOnly/>
                    </div>

                    <div className="col-12 mt-3">
                        <label>Products:</label>
                        <div className="products-container" style={{minHeight: "200px"}}>
                            {details.map((detail) => {
                                if (products.some(prod => prod.id == detail.productId)){
                                    return (
                                        <DetailComponent 
                                            product={products.find(prod => prod.id == detail.productId)!} 
                                            qty={detail.qty} 
                                            deleteDetail={() => {}}
                                        />)
                                } else {
                                    return(<></>)
                                }
                            })
                        }
                        </div>
                    </div>

                    <div className="col-12 mt-2">
                        <button className='btn btn-primary' onClick={(e) => handleAddProduct(e)}>
                            + Add Product
                        </button>
                    </div>
                </div>
            </form>
            <hr />
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <button className='btn btn-save'>
                        Confirm and Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export { AddOrder };