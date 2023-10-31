import subRoutes from './routes/index';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';

const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: subRoutes
  },
  // session pages route
  { path: '/', element: <Navigate to="/dashboard" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
