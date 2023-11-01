import { JwtAuth } from 'app/providers/ContextProvider';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {

  // CHECK HERE FOR AUTHENTICATED ROUTE OR NOT:

  // const { isAuthenticated } = useContext(JwtAuth)
  const { pathname } = useLocation()
  const isAuthenticated = localStorage.getItem("JwtToken")
  // console.log("authenticated -> ", isAuthenticated);
  if (isAuthenticated) {
    return <>{children}</>
  } else {
    return <Navigate replace to="/" state={{ from: pathname }} />
  }
}

export default AuthGuard
