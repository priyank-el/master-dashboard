import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {

  const { pathname } = useLocation();
  if (children) {
    return (
      <>
        {children}
      </>
    )
  }
  else {
    return <Navigate replace to="/not-secure" state={{ from: pathname }} />;
  }
};

export default AuthGuard;
