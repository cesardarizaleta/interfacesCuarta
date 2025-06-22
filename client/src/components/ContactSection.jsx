import { useState } from "react"
import CameraImg from "../assets/camera.png"

const ContactSection = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact-section" className="px-12 lg:px-32 py-16 relative">
      {/* Main text start */}
      <h1 className="uppercase text-5xl mb-4 font-semibold">Contact us</h1>
      {/* Main text end */}

      {/* Form start */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="hidden md:flex justify-center items-center">
          <img src={CameraImg || "/placeholder.svg?height=300&width=400"} alt="Camera" />
        </div>
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col items-center w-full max-w-xs px-2 mb-6">
            <p className="text-xs sm:text-sm mt-2 text-stone-500">E-mail address</p>
            <input
              type="email"
              name="email"
              id="user_email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@domain.com"
              className="w-full px-3 py-2 sm:py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 transition-all duration-300 text-sm sm:text-base focus:ring-stone-500"
              required
            />
          </div>

          <p className="text-xs sm:text-sm mt-2 text-stone-500">Message</p>
          <div className="flex flex-col items-center w-full max-w-xs px-2 mb-6">
            <textarea
              name="message"
              id="user_message"
              cols="30"
              rows="10"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="w-full px-3 py-2 sm:py-2.5 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 transition-all duration-300 text-sm sm:text-base focus:ring-stone-500 resize-vertical"
              required
            ></textarea>
          </div>

          <button
            onClick={handleSubmit}
            className="btn w-full md:w-1/2 bg-stone-700 text-white px-6 py-3 rounded-md hover:bg-stone-800 transition-colors font-medium"
          >
            Send
          </button>
        </div>
      </div>
      {/* Form end */}

      {/* Circle start */}
      <div className="bg-neutral-200 h-44 w-44 md:h-52 md:w-52 rounded-full absolute -top-20 left-0 mt-16 -z-20"></div>
      {/* Circle end */}
    </section>
  )
}

export default ContactSection
