import { Navigate, Outlet } from "react-router-dom"

const Anonymous = () => {
    const user = localStorage.getItem("token")
    return user ? <Navigate to="/" /> : <Outlet />
}

export default Anonymous