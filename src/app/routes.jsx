import subRoutes from './routes/index'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import AuthGuard from './auth/AuthGuard'
import Loadable from './components/Loadable'
import MatxLayout from './components/MatxLayout/MatxLayout'

const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')))
const SigninPage = Loadable(lazy(() => import('app/views/sessions/SigninPage')))
const SignupPage = Loadable(lazy(() => import('app/views/sessions/SignupPage')))
const ForgotPassword = Loadable(lazy(() => import('./views/sessions/ForgotPassword')))

const isAuthenticated = localStorage.getItem("JwtToken")

const baseRoute =
  isAuthenticated
    ?
    { path: '/', element: <Navigate to="/dashboard" /> }
    :
    { path: '/', element: <Navigate to="/signin" /> }

const signup =
  isAuthenticated
    ?
    { path: '/signup', element: <Navigate to="/dashboard" /> }
    :
    { path: '/signup', element: <SignupPage /> }

const signin =
  isAuthenticated
    ?
    { path: '/signin', element: <Navigate to="/dashboard" /> }
    :
    { path: '/signin', element: <SigninPage /> }

const forgotPassword =
  isAuthenticated
    ?
    { path: '/forgot-password', element: <Navigate to="/dashboard" /> }
    :
    { path: '/forgot-password', element: <ForgotPassword /> }

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: subRoutes
  },
  // without session pages route

  baseRoute,
  signup,
  signin,
  forgotPassword,

  { path: '*', element: <NotFound /> }
];

export default routes;
