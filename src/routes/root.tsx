import { Link, Outlet } from "react-router-dom";

function Root() {
    return (
      <div className="container-fluid p-0 d-flex flex-column" style={{minHeight: "100vh"}}>
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#eef1f5"}}>
          <div className="container">
            <a className="navbar-brand" href="#">Reto Técnico</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to={"/my-orders"}>
                    My Orders
                  </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to={"/add-order"}>
                    Add/Edit Order
                </Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to={"/Products"}>
                    Products
                </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          <Outlet />
        </div>
      </div>
    );
}

export { Root };