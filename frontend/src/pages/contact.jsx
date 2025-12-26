import React from 'react'

const contact = () => {
  return (
    <div>
      <section className="py-16 px-6 md:px-20 bg-gray-50">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h2>
    <p className="text-lg text-gray-600 mb-12">
      Have questions about your genetic health, or want to know more about our 
      <span className="font-semibold text-primary"> Genetic Trait Predictor</span> platform?  
      We’d love to hear from you. Reach out to us through the details below or fill out the form.
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
    {/* Contact Information */}
    <div className="bg-white shadow-lg rounded-2xl p-8 text-left border border-gray-100">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h3>
      <ul className="space-y-3 text-gray-700">
        <li>📍 <span className="font-medium">Address:</span> Pune, Maharashtra, India</li>
        <li>📧 <span className="font-medium">Email:</span> support@genesis.com</li>
        <li>📞 <span className="font-medium">Phone:</span> +91 98765 43210</li>
        <li>⏰ <span className="font-medium">Hours:</span> Mon - Fri, 9:00 AM - 6:00 PM</li>
      </ul>
    </div>

    {/* Contact Form */}
    <form className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
          required 
        />
      </div>
      <div className="mb-4">
        <input 
          type="email" 
          placeholder="Your Email" 
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
          required 
        />
      </div>
      <div className="mb-6">
        <textarea 
          placeholder="Your Message" 
          rows="4"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
          required 
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
      >
        Send Message
      </button>
    </form>
  </div>

  {/* Google Map */}
<div className="max-w-6xl mx-auto mt-12">
  <iframe
    title="Genesis Location"
    src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d7563.849171903886!2d73.98099104207839!3d18.577438380108525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d18.579297999999998!2d73.9901575!4m5!1s0x3bc2c38275a673c5%3A0x368b6a8fa28346d!2sG%20H%20RAISONI%20College%20OF%20ENGINEERING%20AND%20Management%2C%20PUNE%2C%20Gat%201200%2C%20Domkhel%20Rd%2C%20Wageshwar%20Nagar%2C%20Wagholi%2C%20Pune%2C%20Maharashtra%20412207!3m2!1d18.5733721!2d73.9821243!5e0!3m2!1sen!2sin!4v1755434245535!5m2!1sen!2sin"
    width="100%"
    height="400"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-2xl shadow-lg border border-gray-200"
  ></iframe>
</div>

</section>

    </div>
  )
}

export default contact
