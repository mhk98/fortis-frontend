import React, { useState } from 'react';
import { Button } from "@windmill/react-ui";
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useUserRegisterMutation } from '../../features/auth/auth';

const UserForm = () => {
  const [passwordError, setPasswordError] = useState('');


  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImage(file); // save actual file
    setPreview(URL.createObjectURL(file)); // for display
  }
};


  console.log("image", image)

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setPasswordError("Passwords do not match");
//     } else {
//       setPasswordError('');
//       // Continue with form submission logic
//       toast.success("Form submitted successfully");
//     }
//   };


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [userRegister] = useUserRegisterMutation()


  const onFormSubmit = async (data) => {
    console.log("formData", data)
  const formData = new FormData();
  formData.append("Name", data.Name);
  formData.append("Username", data.Username);
  formData.append("Email", data.Email);
  formData.append("Contact", data.Contact);
  formData.append("Password", data.Password); 
  formData.append("Address", data.Address); 
  formData.append("Role", data.Role); 
  formData.append("Property", data.Property); 
  formData.append("Status", data.Status); 
  if (image) {
    formData.append("image", image);
  }

  if (data.Password !== data.ConfirmPassword) {
          setPasswordError("Passwords do not match");
        } else {
          setPasswordError('');
          // Continue with form submission logic
          console.log("Form submitted successfully");
        }


  try {
    const res = await userRegister(formData);
    if (res.data?.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.error?.data?.message || "Registration failed. Please try again.");
    }
  } catch (error) {
    toast.error("An unexpected error occurred.");
  }
};

  


  return (
    <div className="border rounded-md shadow-md bg-white w-full mx-auto my-6">
      {/* Header */}
      <div className="bg-blue-500 text-white px-4 py-2 rounded-t-md flex items-center">
        <span className="mr-2">🔒</span>
        <h2 className="text-md font-semibold">User Info</h2>
      </div>

      {/* Form Body */}
      <div className="p-6">
        <div className="flex flex-col gap-6">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            {/* Profile Image */}
            <div className="flex flex-col items-start w-full">
              <label className="font-medium mb-2">Profile Image:</label>
              <div className="w-32 h-32 border border-gray-300 mb-2 bg-gray-100 flex items-center justify-center overflow-hidden">
                {image ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span />
                )}
              </div>
              <input
                type="file"
                onChange={handleImageChange}
                className="border px-3 py-1 text-sm rounded bg-white"
              />
            </div>

            {/* Input Fields */}
            <div className="w-full space-y-4 mt-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name: <span className="text-red-500">*</span>
                </label>                  
                <input type="text" {...register("Name")} placeholder="Name" className="w-full border rounded px-3 py-2 text-sm" />
                {errors.Name && (
                                 <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>
                )}
              </div>

              {/* User Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Name: <span className="text-red-500">*</span>
                </label>
                <input type="text" {...register("Username")} placeholder="User Name" className="w-full border rounded px-3 py-2 text-sm" />
                {errors.Username && (
                                 <p className="text-red-500 text-sm mt-1">{errors.Username.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email: <span className="text-red-500">*</span>
                </label>
                <input type="email" {...register("Email")} placeholder="Email Address" className="w-full border rounded px-3 py-2 text-sm" />
                {errors.Email && (
                                 <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact: <span className="text-red-500">*</span>
                </label>
                <input type="text" {...register("Contact")} placeholder="Contact Number" className="w-full border rounded px-3 py-2 text-sm" />
                {errors.Contact && (
                                 <p className="text-red-500 text-sm mt-1">{errors.Contact.message}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address: <span className="text-red-500">*</span>
                </label>
                <input type="text" {...register("Address")} placeholder="Mail Address" className="w-full border rounded px-3 py-2 text-sm" />
                {errors.Address && (
                                 <p className="text-red-500 text-sm mt-1">{errors.Address.message}</p>
                )}
              </div>

              {/* Property Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property: <span className="text-red-500">*</span>
                </label>
                <select {...register("Property")} className="w-full border rounded px-3 py-2 text-sm">
                  <option value="">Property Type...</option>
                  <option value="property1">Property 1</option>
                  <option value="property2">Property 2</option>
                </select>
                {errors.Property && (
                <p className="text-red-500 text-sm mt-1">{errors.Property.message}</p>
                )}
              </div>

              {/* User Role Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Role: <span className="text-red-500">*</span>
                </label>
                <select {...register("Role")} className="w-full border rounded px-3 py-2 text-sm">
                  <option value="">Role Type...</option>
                  <option value="admin">Admin</option>
                  <option value="operator">Operator</option>
                  <option value="kitchen">Kitchen</option>
                </select>
                {errors.Role && (
                <p className="text-red-500 text-sm mt-1">{errors.Role.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password: <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("Password")}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                 {errors.Password && (
                 <p className="text-red-500 text-sm mt-1">{errors.Password.message}</p>
                )}
              </div>

              {/* Re-type Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Re-type Password: <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  {...register("ConfirmPassword")}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                {passwordError && (
                  <p className="text-red-600 text-xs mt-1">{passwordError}</p>
                )}
              </div>

              {/* User Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status: <span className="text-red-500">*</span>
                </label>
                <select {...register("Status")} className="w-full border rounded px-3 py-2 text-sm">
                  <option value="">Status...</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.Status && (
                 <p className="text-red-500 text-sm mt-1">{errors.Status.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-4 flex justify-end">
                <Button type="submit" className="w-auto px-6">
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
