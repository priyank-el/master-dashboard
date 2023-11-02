import materialRoutes from "app/views/material-kit/MaterialRoutes"
import { lazy } from "react"
import Loadable from "app/components/Loadable"

const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')))
const AdminProfileView = Loadable(lazy(() => import('app/views/profile/AdminProfileView')))
const UpdateAdminProfile = Loadable(lazy(() => import('app/views/profile/UpdateAdminProfile')))
const UpdatePassword = Loadable(lazy(() => import('app/views/profile/UpdatePassword')))

const subRoutes = [
    ...materialRoutes,
    { path: '/dashboard', element: <Analytics /> },
    { path: '/profile', element: <AdminProfileView /> },
    { path: '/update-profile', element: <UpdateAdminProfile /> },
    { path: '/update-password', element: <UpdatePassword /> },
]

export default subRoutes