// src/pages/doctors.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DoctorsCard from '../components/DoctorsCard';

import { doctorsData, specialtyData } from './doctorsData.jsx';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const [selectedSpecialty, setSelectedSpecialty] = useState(speciality || null);

  useEffect(() => {
    if (selectedSpecialty) {
      const filtered = doctorsData.filter(
        (doctor) => doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctorsData);
    }
  }, [selectedSpecialty]);

  const handleSpecialtyClick = (name) => {
    setSelectedSpecialty(name);
    navigate(`/doctors/${name}`); // Update the URL
  };

  const handleAllDoctorsClick = () => {
    setSelectedSpecialty(null);
    navigate('/doctors'); // Reset to the main doctors page URL
  };

  const handleCardClick = (doctor) => {
    navigate(`/doctors/details/${doctor.id}`); // Navigate to the details page for this doctor
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans antialiased">
     

      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          All Doctors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorsCard key={doctor.id} doctor={doctor} onCardClick={handleCardClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;