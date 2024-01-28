import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductsModal } from '../../components/ProductsModal';
import { Product } from '../../models/Product';
import { createOrder, getProducts } from '../../utils';
import { Detail } from '../../models/Detail';
import { DetailComponent } from '../../components/Detail';
import { EditModal } from '../../components/EditModal';
import { Loader } from '../../components/Loader';

function AddOrder() {
    const navigate = useNavigate();
    const [mode, setMode] = React.useState<string>("");
    const [modalOpened, setModalOpened] = React.useState<Boolean>(false);
    const [editModalOpened, setEditModalOpened] = React.useState<boolean>(false);
    const [detailSelected, setDetailSelected] = React.useState<Detail>();
    const [products,setProducts] = React.useState<Product[]>([]);
    const [orderNum, setOrderNum] = React.useState<string>("")
    const [details, setDetails] = React.useState<Detail[]>([]);
    const [saving, setSaving] = React.useState<boolean>(false);
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
        const fetchProducts = async () => {
            try {
                const res: Product[] = await getProducts();
                setProducts(res);
                setDetails([]);
                setOrderNum(uuidv4());
            } catch (error){
                alert(error);
            }
        }

        fetchProducts();
    }, [])

    const handleAddProduct = (e: any) => {
        e.preventDefault();
        setModalOpened(true);
    }

    const handleAddDetail = (productId: string, qty: number) => {
        setDetails(details => {
            let productInDetail = details.find(detail => detail.productId == productId);
            if (productInDetail) {
                console.log((productInDetail.qty as number) + qty);
                
                productInDetail.qty = (productInDetail.qty as number) + qty
                return details
            } else {
                return [...details, {
                    productId,
                    qty
                }]
            }
        })

        setProducts(products => {
            let productFound = products.find(prod => prod.id == productId);
            productFound!.qtyInStock = (productFound!.qtyInStock as number) - qty;
            return products
        })
    }

    const handleDeleteDetail = (productId: string) => {
        setProducts(products => {
            let productFound = products.find(prod => prod.id == productId);
            let productInDetail = details.find(detail => detail.productId == productId);
            productFound!.qtyInStock = Number(productFound!.qtyInStock) + Number(productInDetail?.qty!);
            
            return products;
        })
        setDetails(details => {
            return details.filter(detail => detail.productId != productId);
        })
    }

    const handleEditDetail = (productId: string) => {
        setEditModalOpened(true);
        setDetailSelected(details.find(detail => detail.productId == productId));
    }

    const handleSaveChanges = (detail: Detail) => {
        setDetails(details => {
            let productInDetail = details.find(detail => detail.productId == detail.productId);
            productInDetail!.qty = detail.qty;
            return details
        })
    }

    const handleCreateOrder = () => {
        setSaving(true);
        createOrder({
            orderNum: orderNum,
            date: new Date(),
            details: details
        })
            .then(_ => {
                navigate("/my-orders");
            })
    }

    return (
        <div className="container">
            {saving ? 
            <div className='modal-container d-flex justify-content-center align-items-center'>
                <div className='bg-white p-4 rounded d-flex flex-column justify-content-center align-items-center'>
                    <Loader />
                    <p className='mt-2'>Creando...</p>
                </div>
            </div>
            : ""}
            {modalOpened ? 
            <ProductsModal closeModal={() => setModalOpened(false)} products={products} addDetail={handleAddDetail}/> 
            : ""}
            {editModalOpened ? 
            <EditModal closeModal={() => setEditModalOpened(false)} products={products} detail={detailSelected!} saveChanges={handleSaveChanges}/> 
            : ""}
            <h2 className='mb-3'>{mode == "add" ? "Add Order" : "Edit Order"}:</h2>
            <form>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <label>Order Number:</label>
                        <input className="form-control" type="text" value={mode == "add" ? orderNum : ""} readOnly/>
                    </div>

                    <div className="col-12 col-md-6">
                        <label>Date:</label>
                        <input className="form-control" type="text" value={new Date().toLocaleString()} disabled readOnly/>
                    </div>

                    <div className="col-12 mt-3">
                        <label>{details.length} Products:</label>
                        <div className="products-container" style={{minHeight: "200px"}}>
                            {details.map((detail, index) => {
                                if (products.some(prod => prod.id == detail.productId)){
                                    return (
                                        <DetailComponent 
                                            key={index}
                                            product={products.find(prod => prod.id == detail.productId)!} 
                                            qty={detail.qty} 
                                            deleteDetail={handleDeleteDetail}
                                            editDetail={handleEditDetail}
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
                    <button className='btn btn-save' onClick={() => handleCreateOrder()}>
                        Confirm and Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export { AddOrder };