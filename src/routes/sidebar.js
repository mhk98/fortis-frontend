
const routes = [
  {
    icon: 'PagesIcon',
    name: 'System User',
    routes: [
      // submenu
      {
        path: '/app/add-user',
        name: 'Add User',
      },
      {
        path: '/app/user-list',
        name: "User's List",
      },
     
    ],
  },
  {
    path: '/app/operator-outlet', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Operator Outlet', // name that appear in Sidebar
  },
  {
    path: '/app/kitchen-dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Kitchen Dashboard', // name that appear in Sidebar
  },
 
]
export default routes
