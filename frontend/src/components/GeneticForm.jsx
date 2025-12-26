import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const INITIAL_FORM = { name: '', age: '', gender: '', familyHistory: '' };

const GeneticForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [predictions, setPredictions] = useState(null); // structured predictions object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { token } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPredictions(null);
    try {
      const headers = token
        ? {
            Authorization: `Bearer ${token}`,
            'x-auth-token': token
          }
        : {};
      const { data } = await axios.post('http://localhost:5000/api/genetics/predict', formData, { headers });
      // Backend returns: { id, predictions: { eyeColor: {value,confidence}, height:{value,confidence}, diseaseRisks:[{condition,risk,confidence}] } }
      if (!data?.predictions) {
        throw new Error('Unexpected response shape');
      }
      setPredictions(data.predictions);
    } catch (err) {
      console.error('Prediction request failed:', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Error predicting traits.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Genetic Disease Prediction Form</h1>
      <form onSubmit={handleSubmit} className='grid gap-4 md:grid-cols-2'>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="border p-2 rounded col-span-2 md:col-span-1"/>
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="border p-2 rounded col-span-2 md:col-span-1"/>
        <select name="gender" value={formData.gender} onChange={handleChange} required className="border p-2 rounded col-span-2 md:col-span-1">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <textarea name="familyHistory" placeholder="Family Genetic History" value={formData.familyHistory} onChange={handleChange} required className="border p-2 rounded col-span-2 h-32"/>
        <button type="submit" disabled={loading} className="bg-primary text-white py-2 rounded hover:scale-105 transition-all col-span-2 disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {error && (
        <div className='mt-4 p-4 rounded bg-red-100 text-red-700 border border-red-200'>
          {error}
        </div>
      )}

      {predictions && !error && (
        <div className='mt-6 space-y-4'>
          <div className='p-4 bg-gray-50 rounded border'>
            <h2 className='font-semibold mb-2'>Eye Color</h2>
            <p><span className='font-medium'>Prediction:</span> {predictions.eyeColor.value}</p>
            <p className='text-sm text-gray-500'>Confidence: {(predictions.eyeColor.confidence * 100).toFixed(1)}%</p>
          </div>
          <div className='p-4 bg-gray-50 rounded border'>
            <h2 className='font-semibold mb-2'>Height</h2>
            <p><span className='font-medium'>Predicted Adult Height:</span> {predictions.height.value} cm</p>
            <p className='text-sm text-gray-500'>Confidence: {(predictions.height.confidence * 100).toFixed(1)}%</p>
          </div>
          <div className='p-4 bg-gray-50 rounded border'>
            <h2 className='font-semibold mb-2'>Disease Risk Overview</h2>
            <div className='grid gap-3 md:grid-cols-2'>
              {predictions.diseaseRisks.map((r, idx) => (
                <div key={idx} className='border rounded p-3 bg-white shadow-sm'>
                  <p className='font-medium'>{r.condition}</p>
                  <p className={`text-sm mt-1 ${r.risk === 'High' ? 'text-red-600' : r.risk === 'Moderate' ? 'text-amber-600' : 'text-green-600'}`}>Risk: {r.risk}</p>
                  <p className='text-xs text-gray-500'>Confidence: {(r.confidence * 100).toFixed(0)}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneticForm;
