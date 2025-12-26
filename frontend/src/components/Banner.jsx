import React from 'react'
import { assets } from '../assets/assets'   

const Banner = () => {
  return (
    <div className="bg-[#5865f2] text-white rounded-xl mx-6 lg:mx-24 my-12 px-8 py-10 flex flex-col lg:flex-row items-center justify-between">
      <div className="text-center lg:text-left mb-6 lg:mb-0">
        <h2 className="text-2xl md:text-3xl font-bold leading-snug">
          Book Appointment <br /> With 100+ Trusted Doctors
        </h2>
        <button className="mt-4 px-6 py-2 bg-white text-[#5865f2] font-semibold rounded-full hover:bg-gray-100 transition">
          Create account
        </button>
      </div>

      <img
        src={assets.appointment_img}
        alt="Doctor"
        className="w-56 md:w-72 lg:w-80"
      />
    </div>
  )
}

export default Banner
