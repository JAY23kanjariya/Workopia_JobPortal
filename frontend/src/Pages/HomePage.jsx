import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between px-8 py-5 shadow-sm">
        <div className="text-2xl font-bold text-blue-600 tracking-tight cursor-pointer">
          Workopia
        </div>

        <div className="space-x-6">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </div>
      </nav>


      {/* ================= HERO SECTION ================= */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-r from-blue-50 to-slate-50">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 max-w-3xl leading-tight">
          Find Your Dream Job with <span className="text-blue-600">Workopia</span>
        </h1>

        <p className="mt-6 text-gray-600 text-lg max-w-2xl">
          Discover thousands of job opportunities from top companies.
          Search by title, location, or category and apply in minutes.
        </p>

        {/* Search Box */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 w-full max-w-2xl">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Location"
            className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate('/jobs')}
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Browse Jobs
          </button>

          <button
            onClick={() => navigate('/register')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </section>


      {/* ================= FEATURES SECTION ================= */}
      <section className="py-16 bg-white px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose Workopia?
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-6 shadow-md rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Easy Job Search
            </h3>
            <p className="text-gray-600">
              Filter jobs by category, location, and job type. Find exactly what suits you.
            </p>
          </div>

          <div className="p-6 shadow-md rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Quick Apply
            </h3>
            <p className="text-gray-600">
              Apply instantly with resume and cover letter. Simple and fast process.
            </p>
          </div>

          <div className="p-6 shadow-md rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Employer Dashboard
            </h3>
            <p className="text-gray-600">
              Employers can post jobs, manage applications, and find top talent easily.
            </p>
          </div>

        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} Workopia. All rights reserved.
      </footer>

    </div>
  )
}

export default HomePage