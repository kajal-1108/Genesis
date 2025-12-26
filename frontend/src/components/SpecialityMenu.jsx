import React from 'react'
import { useNavigate } from 'react-router-dom';
import colorblindnessimg from '../assets/blind.png'
import diabetesimg from '../assets/glucose-meter.png'
import downsyndromeimg from '../assets/down-syndrome.png'
import birthasphyxiaimg from '../assets/medical.png'
import leighsyndromeimg from '../assets/brain.png'
import lactoseintoleranceimg from '../assets/no-milk.png'
import cysticfibrosisimg from '../assets/lungs.png'
import mitochondialmyopathyimg from '../assets/mitochondria.png'




const SpecialityMenu = () => {
  const navigate = useNavigate();
  const disorders= [
    { name: 'color blindness' , image: colorblindnessimg},
    { name: 'diabetes' , image: diabetesimg},
    { name: 'downsyndrome' , image: downsyndromeimg},
    { name: 'birthasphyxia' , image: birthasphyxiaimg},
    { name: 'leighsyndrome' , image:leighsyndromeimg},
    { name: 'lactoseintolerance' , image:lactoseintoleranceimg},
    { name: 'cysticfibrosis' , image: cysticfibrosisimg},
    { name: ' mitochondialmyopathy' , image: mitochondialmyopathyimg},
  ]
  
   const handleClick = (disorderName) => {
    const encoded = encodeURIComponent(disorderName);
    navigate(`/doctors`);
  };

  
  
    return (

     <section className="py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-4">Explore Hereditary Health Conditions</h2>
      <p className="text-gray-600 mb-10">
        Learn about common genetic disorders and assess your personal risk.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {disorders.map((disorder, index) => (
          <div key={index} className="flex flex-col items-center"  onClick={() => handleClick(disorder.name)}>
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shadow-md overflow-hidden">
              <img
                src={disorder.image}
                alt={disorder.name}
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="mt-3 font-medium">{disorder.name}</p>
          </div>
        ))}
      </div>
    </section>

  )
}

export default SpecialityMenu
