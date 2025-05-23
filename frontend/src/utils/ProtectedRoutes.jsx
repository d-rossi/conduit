import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
    const user = localStorage.getItem("token")
    return user ? <Outlet /> : <Navigate to="/"/>
}

export default ProtectedRoutes