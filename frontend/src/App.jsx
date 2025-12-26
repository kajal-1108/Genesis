import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GeneticForm from './components/GeneticForm';
import { AppContext } from './context/AppContext';
import { useContext } from 'react';

import Home from './pages/Home';
import Doctors from './pages/doctors'; // renamed to avoid confusion
import DoctorsDetailspage from "./pages/DoctorsDetailspage";

import Login from './pages/login';
import About from './pages/about';
import Contact from './pages/contact';
import MyProfile from './pages/myprofile';
import MyAppointment from './pages/myappointment';
import Appointment from './pages/appointment';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Signup from "./pages/signup";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);
  if (!isAuthenticated) {
    return <div className='py-20 text-center'>You must <a className='text-primary underline' href='/login'>login</a> to access this page.</div>;
  }
  return children;
};

const PredictPage = () => (
  <div className='py-8'>
    <h1 className='text-3xl font-semibold mb-6 text-center'>Phenotypic Trait Prediction</h1>
    <p className='text-center text-gray-600 mb-10 max-w-2xl mx-auto'>Provide basic demographic and family history. In future iterations, SNP genotype data and uploaded raw files will refine predictions.</p>
    <GeneticForm />
  </div>
);

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />        {/* Doctors list page */}
        <Route path="/doctors/details/:id" element={<DoctorsDetailspage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointment" element={<MyAppointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
  <Route path="/predict" element={<ProtectedRoute><PredictPage /></ProtectedRoute>} />
       
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
