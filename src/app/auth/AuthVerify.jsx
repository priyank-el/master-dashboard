import { Navigate, Outlet } from "react-router-dom"

export default function AuthVerify() {
    return (localStorage.getItem("JwtToken")
        ?
        <>
            <Outlet />
        </>
        : <Navigate to='/auth' />)
}