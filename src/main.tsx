import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { Root } from "./routes/root";
import { AddOrder } from "./routes/AddOrder/AddOrder";
import { MyOrders } from './routes/MyOrders/MyOrders';
import { Products } from './routes/Products/Products';
import { CreateProduct } from './routes/CreateProduct/CreateProduct';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "my-orders",
        element: <MyOrders />
      },
      {
        path: "add-order/:id?",
        element: <AddOrder />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "add-product",
        element: <CreateProduct />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
