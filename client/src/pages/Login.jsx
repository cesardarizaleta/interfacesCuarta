import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("Login attempt:", formData)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      navigate("/")
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative h-screen w-screen overflow-hidden bg-stone-100 flex items-center justify-center">

      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-12 max-md:p-10 max-md:w-[80%]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-stone-800">LANDING</h1>
          <p className="text-2xl font-light uppercase tracking-widest text-stone-600">PHOTOGRAPHY</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-semibold text-stone-800">Welcome Back</h2>
            <p className="text-sm text-stone-500">Sign in to your account</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-600 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500 text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-600 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500 text-sm"
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-stone-600">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="rounded border-stone-300 text-stone-600 focus:ring-stone-500"
              />
              <span className="ml-2">Remember me</span>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-700 text-white py-3 rounded hover:bg-stone-800 transition transform hover:-translate-y-0.5 shadow-md px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <Link to="/" className="block text-center text-stone-600 hover:text-stone-800 mt-4 hover:underline">
            Volver a la página principal
          </Link>

          <p className="text-center text-sm text-stone-600">
            {"Don't have an account? "}
            <Link to="/register" className="font-medium text-stone-800 hover:text-stone-900">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login
