import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      //Lógica de registro, si hubiera... 
      console.log("Register attempt:", formData)
      //Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess("Account created successfully! Redirecting...")
      setTimeout(() => navigate("/login"), 2000)
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative h-screen w-screen overflow-hidden bg-stone-100 flex items-center justify-center">

      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-12 max-md:w-[80%]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-stone-800">LANDING</h1>
          <p className="text-2xl font-light uppercase tracking-widest text-stone-600">PHOTOGRAPHY</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-semibold text-stone-800">Create an Account</h2>
            <p className="text-sm text-stone-500">Sign up to get started</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-600 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Full Name"
                className="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500 text-sm"
                required
              />
            </div>

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

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-stone-600 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-500 text-sm"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-700 text-white py-3 rounded hover:bg-stone-800 transition transform hover:-translate-y-0.5 shadow-md px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <Link to="/" className="block text-center text-stone-600 hover:text-stone-800 mt-4 hover:underline">
            Volver a la página principal
          </Link>

          <p className="text-center text-sm text-stone-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-stone-800 hover:text-stone-900">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Register
