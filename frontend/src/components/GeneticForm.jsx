import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const INITIAL_FORM = {
  name: "",
  age: "",
  gender: "",
  familyHistory: "",
};

const GeneticForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { api } = useContext(AppContext); // ✅ use central axios

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPredictions(null);

    try {
      const { data } = await api.post("/genetics/predict", formData);

      if (!data?.predictions) {
        throw new Error("Unexpected response format");
      }

      setPredictions(data.predictions);
    } catch (err) {
      console.error("Prediction error:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          "Error predicting traits"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Genetic Disease Prediction Form
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <textarea
          name="familyHistory"
          placeholder="Family Genetic History"
          value={formData.familyHistory}
          onChange={handleChange}
          required
          className="border p-2 rounded col-span-2 h-32"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white py-2 rounded col-span-2 disabled:opacity-60"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 rounded bg-red-100 text-red-700 border">
          {error}
        </div>
      )}

      {predictions && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded border">
            <h2 className="font-semibold">Eye Color</h2>
            <p>Prediction: {predictions.eyeColor.value}</p>
            <p className="text-sm text-gray-500">
              Confidence: {(predictions.eyeColor.confidence * 100).toFixed(1)}%
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded border">
            <h2 className="font-semibold">Height</h2>
            <p>Predicted Height: {predictions.height.value} cm</p>
            <p className="text-sm text-gray-500">
              Confidence: {(predictions.height.confidence * 100).toFixed(1)}%
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded border">
            <h2 className="font-semibold mb-2">Disease Risk Overview</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {predictions.diseaseRisks.map((r, idx) => (
                <div key={idx} className="border rounded p-3 bg-white">
                  <p className="font-medium">{r.condition}</p>
                  <p
                    className={`text-sm ${
                      r.risk === "High"
                        ? "text-red-600"
                        : r.risk === "Moderate"
                        ? "text-amber-600"
                        : "text-green-600"
                    }`}
                  >
                    Risk: {r.risk}
                  </p>
                  <p className="text-xs text-gray-500">
                    Confidence: {(r.confidence * 100).toFixed(0)}%
                  </p>
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
