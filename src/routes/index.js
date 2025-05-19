import { lazy } from 'react'
import AddUser from '../pages/AddUser'
import UserList from '../pages/UserList'
import EditUser from '../components/User/EditUser'
import OperatorOutlet from '../pages/OperatorOutlet'
import Outlet from '../pages/Outlet'
import KitchenDashboard from '../pages/KitchenDashboard'
import PendingKot from '../components/Kitchen/PendingKot'
import CompleteHistory from '../components/Kitchen/CompleteKot'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))



const routes = [
  {
    path: '/add-user', // the url
    component: AddUser, // view rendered
  },
  {
    path: '/user-list',
    component: UserList,
  },
  {
    path: '/edit-user/:id',
    component: EditUser,
  },
  {
    path: '/operator-outlet',
    component: OperatorOutlet,
  },
  {
    path: '/kitchen-dashboard',
    component: KitchenDashboard,
  },
  {
    path: '/outlet/:id',
    component: Outlet,
  },
  {
    path: '/pending-kot',
    component: PendingKot,
  },
  {
    path: '/complete-kot',
    component: CompleteHistory,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]
export default routes
