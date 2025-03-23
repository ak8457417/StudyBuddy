// import { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
//
// export default function Login() {
//
//     return (
//         <div className="!flex !justify-center !items-center !min-h-screen ">
//             <div className="w-full max-w-md rounded-2xl bg-[#101936] border border-gray-200 !py-6 !px-10">
//                 <h2 className="text-3xl font-bold text-center !mb-6">
//                     Welcome Back
//                 </h2>
//
//                 <form className="!space-y-5">
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
//                             placeholder="Enter your password"
//                             required
//                         />
//                     </div>
//
//                     {/* Login Button */}
//                     <button
//                         type="submit"
//                         className="!w-full !bg-blue-600 !text-white !font-semibold !py-3 !rounded-lg !hover:bg-blue-700 transition-all"
//                     >
//                         Sign In
//                     </button>
//                 </form>
//
//                 {/* Sign Up Link */}
//                 <p className="!text-center !text-sm !text-gray-600 !mt-6">
//                     Don't have an account?{" "}
//                     <Link to={'/signup'} className="!text-blue-500 !font-semibold !hover:underline">
//                         Sign up
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// }

import {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios for making API calls
import { toast } from "react-toastify";
import {FinContext} from "../context/FinContext.jsx";  // Optional: For toast notifications

export default function Login() {
    const {token, setToken} = useContext(FinContext)
    const [email, setEmail] = useState("");  // Email state
    const [password, setPassword] = useState("");  // Password state
    const [message, setMessage] = useState("");  // For success/error messages
    const [isLoading, setIsLoading] = useState(false);  // Loading state
    const navigate = useNavigate();  // For page navigation

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent page reload on form submit

        setIsLoading(true);  // Start loading
        setMessage("");  // Clear previous message

        // Simulated login API request
        try {
            const response = await axios.post("http://localhost:5000/user/api/login", { email, password });

            if (response.data.success) {

                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                setMessage("Login successful!");
                toast.success(response.data.message);
                navigate("/");
            } else {
                toast.error(message || "Login failed");
                setMessage(response.data.message || "❌ Login failed");
            }
        } catch (error) {
            // Handle any errors during API call
            toast.error(error.message || "Login failed");
            setMessage("⚠ Something went wrong. Please try again!");
        } finally {
            setIsLoading(false);  // Stop loading
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token]);

    return (
        <div className="!flex !justify-center !items-center !min-h-screen">
            <div className="w-full max-w-md rounded-2xl bg-[#101936] border border-gray-200 !py-6 !px-10">
                <h2 className="text-3xl font-bold text-center !mb-6">
                    Welcome Back
                </h2>

                {/* Display success/error message */}
                {message && (
                    <p className="text-center mb-4 text-red-600">{message}</p>
                )}

                <form className="!space-y-5" onSubmit={handleLogin}>
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 pb-10">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full border border-gray-300 !p-3 rounded-lg !mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  // Update email state
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
                            className="w-full border border-gray-300 !p-3 rounded-lg !mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}  // Update password state
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="!w-full !bg-blue-600 !text-white !font-semibold !py-3 !rounded-lg !hover:bg-blue-700 transition-all"
                        disabled={isLoading}  // Disable the button when loading
                    >
                        {isLoading ? "Signing In..." : "Sign In"}  {/* Show loading text */}
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="!text-center !text-sm !text-gray-600 !mt-6">
                    Don't have an account?{" "}
                    <Link to={'/signup'} className="!text-blue-500 !font-semibold !hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
