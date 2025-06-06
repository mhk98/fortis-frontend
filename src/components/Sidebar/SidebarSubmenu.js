// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { DropdownIcon } from '../../icons'
// import * as Icons from '../../icons'
// import { Transition } from '@windmill/react-ui'

// function Icon({ icon, ...props }) {
//   const Icon = Icons[icon]
//   return <Icon {...props} />
// }

// function SidebarSubmenu({ route }) {
//   const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)

//   function handleDropdownMenuClick() {
//     setIsDropdownMenuOpen(!isDropdownMenuOpen)
//   }

//   return (
//     <li className="relative px-6 py-3" key={route.name}>
//       <button
//         className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
//         onClick={handleDropdownMenuClick}
//         aria-haspopup="true"
//       >
//         <span className="inline-flex items-center">
//           <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
//           <span className="ml-4">{route.name}</span>
//         </span>
//         <DropdownIcon className="w-4 h-4" aria-hidden="true" />
//       </button>
//       <Transition
//         show={isDropdownMenuOpen}
//         enter="transition-all ease-in-out duration-300"
//         enterFrom="opacity-25 max-h-0"
//         enterTo="opacity-100 max-h-xl"
//         leave="transition-all ease-in-out duration-300"
//         leaveFrom="opacity-100 max-h-xl"
//         leaveTo="opacity-0 max-h-0"
//       >
//         <ul
//           className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
//           aria-label="submenu"
//         >
//           {route.routes.map((r) => (
//             <li
//               className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
//               key={r.name}
//             >
//               <Link className="w-full" to={r.path}>
//                 {r.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </Transition>
//     </li>
//   )
// }

// export default SidebarSubmenu


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Icons from '../../icons'

function Icon({ icon, ...props }) {
  const IconComponent = Icons[icon]
  return <IconComponent {...props} />
}

function SidebarSubmenu({ route }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSubmenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <li className="relative px-6 py-3" key={route.name}>
      <button
        onClick={toggleSubmenu}
        className="inline-flex items-center justify-between w-full text-sm font-semibold text-gray-700 dark:text-gray-200 focus:outline-none"
      >
        <span className="inline-flex items-center">
          <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
          <span className="ml-4">{route.name}</span>
        </span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform transform ${
            isOpen ? 'rotate-90' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

    
      {isOpen && (
        <ul
          className="p-2 mt-2 space-y-2 text-sm font-medium text-gray-500 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
          aria-label="submenu"
        >
          {route.routes.map((r) => (
            <li
              className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              key={r.name}
            >
              <Link className="w-full block" to={r.path}>
                {r.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default SidebarSubmenu
