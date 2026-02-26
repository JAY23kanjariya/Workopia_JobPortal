import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../api/axios'

export default function RegisterPage() {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    // navigate to login page
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
            const response = await api.post('/register', data);

            // show success message
            toast.success('Registration successful');
            navigate('/dashboard');

        } catch (error) {
            if (error.response?.data?.errors) {
                setServerError(error.response.data.errors);
            } else {
                toast.error('Registration failed');
            }
        } finally {
            setLoading(false);
        }
    };

    const password = watch("password", "");

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600 max-w">
                    Step into your career journey with Workopia
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-2xl shadow-blue-900/5 border border-slate-100 sm:rounded-3xl sm:px-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                                I want to register as a:
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="relative flex flex-col items-center justify-center p-4 border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all duration-200 group has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50/50 has-[:checked]:ring-4 has-[:checked]:ring-blue-600/10">
                                    <input
                                        type="radio"
                                        value="jobseeker"
                                        className="sr-only"
                                        {...register("role", { required: "Please select your role" })}
                                    />
                                    <div className="mb-2 text-slate-400 group-has-[:checked]:text-blue-600 transition-colors">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-has-[:checked]:text-blue-700 transition-colors">Job Seeker</span>
                                </label>

                                <label className="relative flex flex-col items-center justify-center p-4 border-2 border-slate-100 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all duration-200 group has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50/50 has-[:checked]:ring-4 has-[:checked]:ring-blue-600/10">
                                    <input
                                        type="radio"
                                        value="employer"
                                        className="sr-only"
                                        {...register("role", { required: "Please select your role" })}
                                    />
                                    <div className="mb-2 text-slate-400 group-has-[:checked]:text-blue-600 transition-colors">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-has-[:checked]:text-blue-700 transition-colors">Employer</span>
                                </label>
                            </div>
                            {errors.role && <p className='mt-2 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{errors.role.message}</p>}
                            {serverError.role && <p className='mt-2 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{serverError.role[0]}</p>}
                        </div>

                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className={`appearance-none block w-full px-4 py-3 border ${errors.name ? 'border-red-300 bg-red-50/30' : 'border-slate-200'} rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 sm:text-sm transition-all duration-200`}
                                {...register("name", {
                                    required: 'Name is required',
                                    validate: { notOnlyWhitespace: (value) => value.trim().length > 0 || 'Only whitespace not allowed' },
                                    minLength: { value: 3, message: 'Minimum 3 characters' },
                                    maxLength: { value: 20, message: 'Maximum 20 characters' },
                                    pattern: { value: /^[a-zA-Z\s]+$/, message: 'Only letters and spaces allowed' }
                                })}
                            />
                            {errors.name && <p className='mt-1 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{errors.name.message}</p>}
                            {serverError.name && <p className='mt-1 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{serverError.name[0]}</p>}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Email address</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className={`appearance-none block w-full px-4 py-3 border ${errors.email ? 'border-red-300 bg-red-50/30' : 'border-slate-200'} rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 sm:text-sm transition-all duration-200`}
                                {...register("email", {
                                    required: 'Email is required',
                                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address' }
                                })}
                            />
                            {errors.email && <p className='mt-1 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{errors.email.message}</p>}
                            {serverError.email && <p className='mt-1 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{serverError.email[0]}</p>}
                        </div>

                        {/* Password Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className={`appearance-none block w-full px-4 py-3 border ${errors.password ? 'border-red-300 bg-red-50/30' : 'border-slate-200'} rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 sm:text-sm transition-all duration-200`}
                                    {...register("password", {
                                        required: 'Password is required',
                                        minLength: { value: 8, message: 'At least 8 characters' },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$_!%*?&])[A-Za-z\d@$_!%*?&]{8,}$/,
                                            message: 'Must include uppercase, number & symbol'
                                        }
                                    })}
                                />
                                {errors.password && <p className='mt-1 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{errors.password.message}</p>}
                                {serverError.password && <p className='mt-1 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{serverError.password[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className={`appearance-none block w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-300 bg-red-50/30' : 'border-slate-200'} rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 sm:text-sm transition-all duration-200`}
                                    {...register("confirmPassword", {
                                        required: 'Please confirm password',
                                        validate: value => value === password || "Passwords don't match"
                                    })}
                                />
                                {errors.confirmPassword && <p className='mt-1 text-[10px] font-bold text-red-500 uppercase tracking-tighter'>{errors.confirmPassword.message}</p>}
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </span>
                                ) : 'Register Account'}
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className="text-center pt-2">
                            <p className="text-sm text-slate-500">
                                Already have an account?{' '}
                                <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-2 decoration-blue-600/20 hover:decoration-blue-600 transition-all">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

