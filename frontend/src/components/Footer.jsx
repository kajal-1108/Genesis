import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 mt-20 px-6 lg:px-24 py-12 border-t">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        
        {/* Logo and Description */}
        <div className="mb-8 md:mb-0 max-w-md">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="text-3xl">🏥</span> Doctor-GEN
          </h2>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-12">
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Get in touch</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>+91-212-456-7890</li>
              <li>doctorgen11@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t pt-4">
        © 2024 DOCTOR-GEN – All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
