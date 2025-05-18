import React from "react"
import { IoHome } from "react-icons/io5";
import UserForm from "../components/User/UserForm";

const AddUser = () => {



    return (
        <>
    <div className="bg-gray-100 px-6 py-3 mt-4">
      <nav className="flex items-center text-gray-500 text-sm space-x-2">
        <IoHome className="w-4 h-4" />
        <span>System User</span>
        <span>{'>'}</span>
        <span className="text-gray-500">Add User</span>
       
      </nav>
    </div>

    <UserForm/>
        </>
    )
}


export default AddUser;