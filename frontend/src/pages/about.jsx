import React from 'react'

const about = () => {
  return (
    <div>
      <section className="about-section py-12 px-6 md:px-20 bg-gray-50">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-6">About Genesis</h2>
    <p className="text-lg text-gray-700 leading-relaxed mb-6">
      Genesis is an AI-powered <span className="font-semibold">Genetic Trait Predictor</span> designed to
      help individuals understand their hereditary health risks. 
      By analyzing genetic score data, our system predicts the likelihood of developing common 
      genetic conditions such as <span className="italic">color blindness, diabetes, Down syndrome, 
      lactose intolerance, cystic fibrosis</span>, and more.
    </p>
    <p className="text-lg text-gray-700 leading-relaxed mb-6">
      Our goal is to empower people with <span className="font-semibold">personalized insights</span> 
      into their genetic health. With early awareness, you can take preventive steps, 
      adopt healthier lifestyles, and consult specialists at the right time.
    </p>
    <p className="text-lg text-gray-700 leading-relaxed">
      At Genesis, we believe knowledge is the first step towards better health. 
      We make genetic predictions simple, reliable, and accessible to everyone.
    </p>
  </div>
</section>

<section className="features-section py-12 px-6 md:px-20 bg-white">
  <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
    <div className="p-6 bg-gray-100 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-3">Predict Genetic Conditions</h3>
      <p className="text-gray-600">Get predictions for multiple hereditary conditions based on your genetic score.</p>
    </div>
    <div className="p-6 bg-gray-100 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-3">Personalized Insights</h3>
      <p className="text-gray-600">Receive detailed information tailored to your unique health profile.</p>
    </div>
    <div className="p-6 bg-gray-100 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-3">Connect with Experts</h3>
      <p className="text-gray-600">Consult with doctors specializing in genetic disorders for guidance and treatment.</p>
    </div>
  </div>
</section>


    </div>
  )
}

export default about
