import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doctorsData, diseaseInfo } from './doctorsData';

const DoctorDetailspage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctorsData.find((doc) => doc.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Doctor not found</h2>
        <Link to="/" className="text-indigo-600 underline">Go Back</Link>
      </div>
    );
  }

  const disease = diseaseInfo[doctor.specialty.toLowerCase()];

  const handleCheckDisease = () => {
    // Navigate to a page where user can check based on genetic score
    navigate(`/check-disease/${doctor.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-indigo-600 underline mb-4 inline-block">
        &larr; Back to Doctors
      </Link>

      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-lg p-6 relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-32 h-32 object-cover rounded-lg absolute top-4 right-4"
        />
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
          <p className="text-indigo-700 font-semibold mb-4">{doctor.specialty}</p>
          <p className="mb-2"><strong>Bio:</strong> {doctor.bio}</p>
          <p className="mb-2"><strong>Education:</strong> {doctor.education}</p>
          <p className="mb-4"><strong>Background:</strong> {doctor.background}</p>

          {disease && (
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-2">{disease.title}</h2>
              <p className="mb-2"><strong>Origin:</strong> {disease.origin}</p>
              <div className="mb-2">
                <strong>Causes:</strong>
                <ul className="list-disc list-inside ml-4">
                  {disease.causes.map((cause, index) => (
                    <li key={index}>{cause}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <strong>Symptoms:</strong>
                <ul className="list-disc list-inside ml-4">
                  {disease.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <strong>Management:</strong>
                <ul className="list-disc list-inside ml-4">
                  {disease.management.map((m, index) => (
                    <li key={index}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <strong>Precautions:</strong>
                <ul className="list-disc list-inside ml-4">
                  {disease.precautions.map((p, index) => (
                    <li key={index}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <strong>Complications:</strong>
                <ul className="list-disc list-inside ml-4">
                  {disease.complications.map((c, index) => (
                    <li key={index}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Check Disease Button */}
          <button
            onClick={handleCheckDisease}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Check UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailspage;
