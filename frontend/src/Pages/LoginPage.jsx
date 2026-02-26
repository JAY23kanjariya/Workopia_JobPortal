import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


function LoginPage() {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    // navigate to register page
    const navigate = useNavigate();
    // server error message
    const [serverError, setServerError] = useState({});
    // loading state
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setServerError({});
            // send request to backend
            const response = await api.post('/login', data);

            // show success message
            toast.success('Login successful');
            navigate('/dashboard');

        } catch (error) {
            if (error.response?.data?.errors) {
                setServerError(error.response.data.errors);
            } else {
                toast.error('Login failed');
            }
        } finally {
            setLoading(false);
        }
    };

    const password = watch("password", "");

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 border-solid border-blue-600 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600 max-w">
                    Enter your email and password to login into your account
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-2xl shadow-blue-900/5 border border-slate-100 sm:rounded-3xl sm:px-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Email address</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className={`appearance-none block w-full px-4 py-3 border ${errors.email ? 'border-red-300 bg-red-50/30' : 'border-slate-200'} rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 sm:text-sm transition-all duration-200`}
                                {...register("email", {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Please enter a valid email address'
                                    }
                                })}
                            />
                            {errors.email && <p className='mt-2 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{errors.email.message}</p>}
                            {serverError.email && <p className='mt-2 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{serverError.email[0]}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className={`appearance-none block w-full px-4 py-3 border ${errors.password ? 'border-red-300 bg-red-50/30' : 'border-slate-200'} rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 sm:text-sm transition-all duration-200`}
                                {...register("password", {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters long'
                                    }
                                })}
                            />
                            {errors.password && <p className='mt-2 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{errors.password.message}</p>}
                            {serverError.password && <p className='mt-2 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{serverError.password[0]}</p>}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>  
    )
}

export default LoginPage
