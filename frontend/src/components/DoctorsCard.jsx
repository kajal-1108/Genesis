import React from 'react';

const DoctorsCard = ({ doctor, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(doctor)}
      className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-indigo-50"
    >
      {/* Doctor's Image */}
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-full h-48 object-cover"
      />

      {/* Card Body */}
      <div className="p-4">
        {/* Availability Status */}
        <div className="flex items-center space-x-2 text-green-500 text-sm font-medium mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Available</span>
        </div>

        {/* Doctor's Name */}
        <h4 className="text-lg font-semibold text-gray-800">{doctor.name}</h4>

        {/* Doctor's Specialty */}
        <p className="text-gray-500 text-sm">{doctor.specialty}</p>
      </div>
    </div>
  );
};

export default DoctorsCard;
