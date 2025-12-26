import React from 'react'

const TopDoctors = () => {
  const doctors = [
    {
      name: "Dr. Aarav Patel",
      specialization: "Ophthalmologist",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Dr. Meera Shah",
      specialization: "Endocrinologist",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Dr. Rahul Mehta",
      specialization: "Geneticist ",
      image: "https://randomuser.me/api/portraits/men/51.jpg"
    },
    {
      name: "Dr. Ananya Iyer",
      specialization: "	Neurologist",
      image: "https://randomuser.me/api/portraits/women/60.jpg"
    },
    {
      name: "Dr. Karan Desai",
      specialization: "Gastroenterologist ",
      image: "https://randomuser.me/api/portraits/men/70.jpg"
    },
    {
      name: "Dr. Nidhi Verma",
      specialization: "Pulmonologist",
      image: "https://randomuser.me/api/portraits/women/72.jpg"
    },
    {
      name: "Dr. Arjun Kapoor",
      specialization: "Pediatrician",
      image: "https://randomuser.me/api/portraits/men/23.jpg"
    },
    {
      name: "Dr. Sneha Kulkarni",
      specialization: "Dietitian",
      image: "https://randomuser.me/api/portraits/women/85.jpg"
    },
    {
      name: "Dr. Rohan Singh",
      specialization: "	Neonatologist",
      image: "https://randomuser.me/api/portraits/men/91.jpg"
    },
    {
      name: "Dr. Priya Malhotra",
      specialization: "	Ophthalmologist",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Top Doctors to Book</h2>
        <p className="text-gray-500 mt-2">Simply browse through our extensive list of trusted doctors.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6 max-w-7xl mx-auto">
        {doctors.map((doctor, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition-all border">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="mx-auto rounded-full w-24 h-24 object-cover mb-4"
            />
            <span className="text-green-600 text-sm font-medium">✔ Available</span>
            <h3 className="mt-2 font-bold text-lg text-gray-800">{doctor.name}</h3>
            <p className="text-sm text-gray-500">{doctor.specialization}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="bg-[#f0f0f0] text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition-all">
          more
        </button>
      </div>
    </div>
  )
}

export default TopDoctors
