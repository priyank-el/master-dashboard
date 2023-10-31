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
  { path: '/', element: <Navigate to="/signin" /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/signin', element: <SigninPage /> },
  { path: '/forgot-password', element: <ForgotPassword /> },

  { path: '*', element: <NotFound /> }
];

export default routes;
