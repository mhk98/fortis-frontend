import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from './app/store'
import EditUser from './components/User/EditUser'
import Outlet from './pages/Outlet'
import OrderDetails from './components/Outlet/OrderDetails'
import EditOrder from './components/Outlet/EditOrder'
import BillPreview from './components/Outlet/BillPreview'
import BillPrint from './components/Outlet/BillPrint'


const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

function App() {
  return (
    <>
      <Provider store={store}>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />

          {/* Place new routes over this */}
          <Route path="/app" component={Layout} />
          {/* <Route path="/editprofile" component={StudentEditProfile} />
          <Route path="/archive-student" component={StudentEditProfile} />
          <Route path="/payments" component={PaymentStatus} /> */}
          {/* If you have an index page, you can remothis Redirect */}
          <Route path="/edit-user" component={EditUser} />
          <Route path="/outlet" component={Outlet} />
          <Route path="/order-details" component={OrderDetails} />
          <Route path="/edit-order" component={EditOrder} />
          <Route path="/bill-preview" component={BillPreview} />
          <Route path="/bill-print" component={BillPrint} />
          <Route path="/pending-kot" component={Outlet} />
          <Route path="/complete-kot" component={Outlet} />
        
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
      <Toaster/>
        </Provider>
    </>
  )
}

export default App
