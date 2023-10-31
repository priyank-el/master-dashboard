import materialRoutes from "app/views/material-kit/MaterialRoutes"
import { lazy } from "react"
import Loadable from "app/components/Loadable"

const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')))

const subRoutes = [
    ...materialRoutes,
    { path: '/dashboard', element: <Analytics /> },
]

export default subRoutes