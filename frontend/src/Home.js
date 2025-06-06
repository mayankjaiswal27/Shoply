import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/auth_helpers";
import Products from "./shopping/products";

export default function Home() {
    const navigate = useNavigate()
    let auth = useAuth()

    
    return (
        <>
            {!auth.isAdmin && <Products />}
            {auth.isAdmin && 
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/users")}>User Management</button>&nbsp;&nbsp;
                    &nbsp;
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/products")}>Product Management</button>&nbsp;&nbsp;
                    &nbsp;
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/orders")}>Orders</button>
                    &nbsp;
                </div>
            }
        </>
    )
}