import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Input, Button } from '@windmill/react-ui'
import toast from 'react-hot-toast'
import { useUserLoginMutation } from '../features/auth/auth'
import { useForm } from 'react-hook-form'
import logo from '../images/logo-big.png';


function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [userLogin] = useUserLoginMutation()
  const history = useHistory()

  const onFormSubmit = async (data) => {
    try {
      const res = await userLogin(data)

      if (res?.data?.success) {
        const { accessToken, user } = res.data.data
        localStorage.setItem("FirstName", user.FirstName)
        localStorage.setItem("LastName", user.LastName)
        localStorage.setItem("role", user.Role)
        localStorage.setItem("userId", user.id)
        localStorage.setItem("image", user.image)

        toast.success(res.data.message)
        history.push("/app")
      } else {
        toast.error(res?.error?.data?.message || "Login failed. Please try again.")
      }
    } catch (error) {
      toast.error("An unexpected error occurred.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4" style={{backgroundColor:"#364150"}}>
    {/* Logo */}
    <div className="mb-6">
      <img
        src={logo} // Replace with your actual logo path
        alt="Logo"
        className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto"
      />
    </div>

    {/* Card */}
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-teal-500 mb-6">
        Sign In
      </h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded-md bg-slate-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-md bg-slate-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
        >
          LOGIN
        </button>
      </form>
    </div>

    {/* Footer */}
    <footer className="mt-6 text-sm text-gray-400 text-center">
      2024 © NICE. Admin Dashboard Template.
    </footer>
  </div>
  )
}

export default Login
