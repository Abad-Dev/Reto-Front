import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductsModal } from '../../components/ProductsModal';
import { Product } from '../../models/Product';
import { createOrder, getOrder, getProducts, updateOrder } from '../../utils';
import { Detail } from '../../models/Detail';
import { DetailComponent } from '../../components/Detail';
import { EditModal } from '../../components/EditModal';
import { Loader } from '../../components/Loader';
import { Order } from '../../models/Order';
import { OrderStatus } from '../../models/OrderStatus';

function AddOrder() {
    let { id } = useParams();
    const navigate = useNavigate();

    const [mode, setMode] = React.useState<string>("");
    const [modalOpened, setModalOpened] = React.useState<Boolean>(false);
    const [editModalOpened, setEditModalOpened] = React.useState<boolean>(false);
    const [detailSelected, setDetailSelected] = React.useState<Detail>();
    const [products,setProducts] = React.useState<Product[]>([]);
    const [orderNum, setOrderNum] = React.useState<string>("");
    const [date, setDate] = React.useState(new Date());
    const [details, setDetails] = React.useState<Detail[]>([]);
    const [saving, setSaving] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const [orderStatus, setOrderStatus] = React.useState<OrderStatus>();

    React.useEffect(() => {
        if (id != undefined) {
            setMode("Edit Order")
            setLoading(true);
            document.title = "Edit Order";

            const fetchOrder = async () => {
                try {
                    const res: Order = await getOrder(id!);
                    setDetails(res.details);
                    setOrderNum(String(res.orderNum));
                    setDate(new Date(res.date));
                    setSaving(false)
                    setLoading(false);
                    setOrderStatus(res.status);
                } catch (error){
                    alert(error);
                }
            }
    
            fetchOrder();
        } else {
            setMode("Add Order")
            document.title = "Add Order";
            setDetails([]);
            setOrderNum(uuidv4());
        }
    }, [id])

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res: Product[] = await getProducts();
                setProducts(res);
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
            let productFound = products.find(prod => prod.id == productId);
            let productInDetail = details.find(detail => detail.productId == productId);
            if (productInDetail) {
                productInDetail.qty = (productInDetail.qty as number) + qty
                return details
            } else {
                return [...details, {
                    productId,
                    product: productFound,
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

    const handleSaveChanges = (prevDetail: Detail, detail: Detail) => {
        
        
        setProducts(products => {
            let productFound = products.find(prod => prod.id == detail.productId);
            productFound!.qtyInStock = Number(productFound!.qtyInStock) + Number(prevDetail?.qty!) - Number(detail.qty);
            
            return products;
        })
        setDetails(details => {
            let detailFound = details.find(_detail => _detail.productId == detail.productId)
            detailFound!.qty = detail.qty;

            return details
        })

        
        
    }

    const handleCreateOrder = () => {
        setSaving(true);
        let orderToSave = {
            orderNum: orderNum,
            date: date,
            status: orderStatus,
            details: details
        }
        if (mode == "Add Order") {  
            createOrder(orderToSave)
                .then(_ => {
                    navigate("/my-orders");
                })
        } else if (mode == "Edit Order") {
            updateOrder(id!, orderToSave)
                .then(_ => {
                    navigate("/my-orders");
                })
        }
    }

    return (
        <div className="container">
            {saving ? 
            <div className='modal-container d-flex justify-content-center align-items-center'>
                <div className='bg-white p-4 rounded d-flex flex-column justify-content-center align-items-center'>
                    <Loader />
                    <p className='mt-2'>
                        {mode == "Add Order" ? "Creating..." : "Saving..."}
                    </p>
                </div>
            </div>
            : ""}
            {modalOpened ? 
            <ProductsModal closeModal={() => setModalOpened(false)} products={products} addDetail={handleAddDetail}/> 
            : ""}
            {editModalOpened ? 
            <EditModal closeModal={() => setEditModalOpened(false)} products={products} detail={detailSelected!} saveChanges={handleSaveChanges}/> 
            : ""}
            <h2 className='mb-0'>{mode}:</h2>
            <hr />
            <form>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <label>Order Number:</label>
                        <input className="form-control" type="text" value={orderNum} readOnly/>
                    </div>

                    <div className="col-12 col-md-6">
                        <label>Date:</label>
                        <input className="form-control" type="text" value={date.toLocaleString()} disabled readOnly/>
                    </div>

                    {mode == "Edit Order" ? 
                    <div className="col-12 mt-3">
                    <label>Order Status:</label>
                        <select className='form-control' value={orderStatus} onChange={(e) => setOrderStatus(Number(e.target.value))}>
                            {Object.keys(OrderStatus).filter(key => !isNaN(Number(key))).map(key => (
                                <option key={key} value={key}>{OrderStatus[Number(key)]}</option>
                            ))}
                        </select>
                    </div>
                    : ""}

                    <div className="col-12 mt-3">
                        <label>{details.length} Products:</label>
                        <div className="products-container justify-content-center justify-content-lg-start" style={{minHeight: "200px"}}>
                            {loading ? 
                            <div className='w-100 d-flex justify-content-center align-items-center flex-column'>
                                <Loader></Loader>
                                <p className='mt-3'>Loading data...</p>
                            </div>
                            :
                            details.map((detail) => {
                                if (products.some(prod => prod.id == detail.productId)){ // If the product exists
                                    return (
                                        <DetailComponent 
                                            key={detail.productId}
                                            product={detail.product!} 
                                            qty={detail.qty} 
                                            deleteDetail={handleDeleteDetail}
                                            editDetail={handleEditDetail}
                                            orderStatus={orderStatus!}
                                        />)
                                } else {
                                    return
                                }
                            })
                            }
                        </div>
                    </div>
                    <p>Total: S/ {
                        details.length > 0 ?
                            details.map(detail => Number(detail.product?.price) * Number(detail.qty)).reduce((acc, val) => acc += val).toFixed(2) : "0.00"}</p>
                    <div className="col-12 mt-2">
                        <button className='btn btn-primary' onClick={(e) => handleAddProduct(e)} disabled={orderStatus == OrderStatus.Completed}>
                            + Add Product
                        </button>
                    </div>
                </div>
            </form>
            <hr />
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <button className='btn btn-save' onClick={() => handleCreateOrder()}>
                        {
                            mode == "Edit Order" ? "Save changes" : "Confirm and Save"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export { AddOrder };