import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HealthPredictionForm.css';

const HealthPredictionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    bmi: '',
    ap_hi: '',
    ap_lo: '',
    cholesterolInput: '',
    cholesterol: 1,
    glucoseInput: '',
    gluc: 1,
    smoke: 0,
    alco: 0,
    active: 0,
    cardio: 0
  });

  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      setFormData(prev => ({ ...prev, bmi }));
    }
  }, [formData.height, formData.weight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCholesterolInput = (value) => {
    let level = 1;
    if (value >= 240) level = 3;
    else if (value >= 200) level = 2;
    
    setFormData(prev => ({
      ...prev,
      cholesterolInput: value,
      cholesterol: level
    }));
  };

  const handleGlucoseInput = (value) => {
    let level = 1;
    if (value >= 200) level = 3;
    else if (value >= 140) level = 2;
    
    setFormData(prev => ({
      ...prev,
      glucoseInput: value,
      gluc: level
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      navigate('/results', { 
        state: { 
          prediction: data.prediction,
          suggestions: data.suggestions,
          formData: formData
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Heart Disease Risk Assessment</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-sections-grid">
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label>Patient ID:</label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="Enter ID"
                required
              />
            </div>
            <div className="form-group">
              <label>Age (years):</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h2>Physical Measurements</h2>
            <div className="form-group">
              <label>Height (cm):</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Enter height"
                required
              />
            </div>
            <div className="form-group">
              <label>Weight (kg):</label>
              <input
                type="number"
                step="0.1"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight"
                required
              />
            </div>
            <div className="form-group">
              <label>BMI:</label>
              <input
                type="number"
                name="bmi"
                value={formData.bmi}
                readOnly
                className="calculated-field"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Blood Pressure</h2>
            <div className="form-group">
              <label>Systolic (mm Hg):</label>
              <input
                type="number"
                name="ap_hi"
                value={formData.ap_hi}
                onChange={handleChange}
                placeholder="Enter systolic"
                required
              />
            </div>
            <div className="form-group">
              <label>Diastolic (mm Hg):</label>
              <input
                type="number"
                name="ap_lo"
                value={formData.ap_lo}
                onChange={handleChange}
                placeholder="Enter diastolic"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Medical Tests</h2>
            <div className="form-group">
              <label>Cholesterol (mg/dL):</label>
              <input
                type="number"
                name="cholesterolInput"
                value={formData.cholesterolInput}
                onChange={(e) => handleCholesterolInput(e.target.value)}
                placeholder="Enter cholesterol"
                required
              />
            </div>
            <div className="form-group">
              <label>Cholesterol Level:</label>
              <input
                type="text"
                value={
                  formData.cholesterol === 1 ? "Normal" :
                  formData.cholesterol === 2 ? "Above Normal" :
                  formData.cholesterol === 3 ? "Well Above Normal" : ""
                }
                readOnly
                className="calculated-field"
              />
            </div>
            <div className="form-group">
              <label>Glucose (mg/dL):</label>
              <input
                type="number"
                name="glucoseInput"
                value={formData.glucoseInput}
                onChange={(e) => handleGlucoseInput(e.target.value)}
                placeholder="Enter glucose"
                required
              />
            </div>
            <div className="form-group">
              <label>Glucose Level:</label>
              <input
                type="text"
                value={
                  formData.gluc === 1 ? "Normal" :
                  formData.gluc === 2 ? "Above Normal (Prediabetes)" :
                  formData.gluc === 3 ? "Well Above Normal (Diabetes)" : ""
                }
                readOnly
                className="calculated-field"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Lifestyle Factors</h2>
            <div className="form-group">
              <label>Smoking:</label>
              <select name="smoke" value={formData.smoke} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Alcohol Intake:</label>
              <select name="alco" value={formData.alco} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Physical Activity:</label>
              <select name="active" value={formData.active} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit">Calculate Risk</button>
      </form>
    </div>
  );
};

export default HealthPredictionForm; 