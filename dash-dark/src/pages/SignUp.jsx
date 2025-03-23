// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
//
// export default function SignUp() {
//     return (
//         <div className="!flex !justify-center !items-center !min-h-screen">
//             <div className="w-full max-w-md rounded-2xl bg-[#101936] border border-gray-200 !py-6 !px-10">
//                 <h2 className="text-3xl font-bold text-center !mb-6">
//                     Create Account
//                 </h2>
//
//                 <form className="!space-y-5">
//                     {/* Name Field */}
//                     <div>
//                         <label htmlFor="name" className="block text-sm font-medium text-gray-300 pb-10">
//                             Full Name
//                         </label>
//                         <input
//                             id="name"
//                             type="text"
//                             className="w-full border border-gray-300 !p-3 rounded-lg !mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                             placeholder="Enter your full name"
//                             required
//                         />
//                     </div>
//
//                     {/* Email Field */}
//                     <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-300 pb-10">
//                             Email Address
//                         </label>
//                         <input
//                             id="email"
//                             type="email"
//                             className="w-full border border-gray-300 !p-3 rounded-lg !mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                             placeholder="Enter your email"
//                             required
//                         />
//                     </div>
//
//                     {/* Password Field */}
//                     <div>
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-300">
//                             Password
//                         </label>
//                         <input
//                             id="password"
//                             type="password"
//                             className="w-full border border-gray-300 !p-3 rounded-lg !mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                             placeholder="Create a password"
//                             required
//                         />
//                     </div>
//
//                     {/* Sign In Button */}
//                     <button
//                         type="submit"
//                         className="!w-full !bg-blue-600 !text-white !font-semibold !py-3 !rounded-lg !hover:bg-blue-700 transition-all"
//                     >
//                         Sign Up
//                     </button>
//                 </form>
//
//                 {/* Sign In Link */}
//                 <p className="!text-center !text-sm !text-gray-600 !mt-6">
//                     Already have an account?{" "}
//                     <Link to={'/login'} className="!text-blue-500 !font-semibold !hover:underline">
//                         Sign in
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// }

import {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {FinContext} from "../context/FinContext.jsx";

export default function SignUp() {
    const {token, setToken} = useContext(FinContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/user/api/signup", formData);

            if (response.data.success) {
                navigate("/");
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                setMessage("Signup successful! Please login.");
                toast.success("Signup successful! Please login.");
            } else {
                setMessage("❌ " + (response.data.message || "Signup failed"));
                toast.error("Signup failed");
            }
        } catch (error) {
            toast.error("⚠ Something went wrong. Please try again!");
            setMessage("⚠ Something went wrong. Please try again!");
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        <div className="!flex !justify-center !items-center !min-h-screen">
            <div className="w-full max-w-md rounded-2xl bg-[#101936] border border-gray-200 !py-6 !px-10">
                <h2 className="text-3xl font-bold text-center !mb-6">
                    Create Account
                </h2>

                {/* Success/Error Message */}
                {message && <p className="text-center mb-4 text-red-600">{message}</p>}

                <form onSubmit={handleSubmit} className="!space-y-5">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 pb-10">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            className="w-full border border-gray-300 !p-3 rounded-lg !mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Enter your full name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 pb-10">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="w-full border border-gray-300 !p-3 rounded-lg !mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Enter your email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="w-full border border-gray-300 !p-3 rounded-lg !mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Create a password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className="!w-full !bg-blue-600 !text-white !font-semibold !py-3 !rounded-lg !hover:bg-blue-700 transition-all"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Sign In Link */}
                <p className="!text-center !text-sm !text-gray-600 !mt-6">
                    Already have an account?{" "}
                    <Link to={'/login'} className="!text-blue-500 !font-semibold !hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
