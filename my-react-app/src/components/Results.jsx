import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, suggestions, formData } = location.state || {};

  return (
    <div className="results-container">
      <h1>Your Heart Health Assessment</h1>
      
      <div className={`prediction-card ${prediction === 1 ? 'high-risk' : 'low-risk'}`}>
        <h2>Risk Assessment</h2>
        <div className="prediction-result">
          {prediction === 1 ? (
            <p className="high-risk">⚠️ High Risk of Heart Disease</p>
          ) : (
            <p className="low-risk">✅ Low Risk of Heart Disease</p>
          )}
        </div>
      </div>

      <div className="metrics-card">
        <h2>Your Health Metrics</h2>
        <div className="metrics-grid">
          <div className="metric">
            <label>BMI:</label>
            <span className={getBMIClass(formData.bmi)}>
              {formData.bmi}
            </span>
          </div>
          <div className="metric">
            <label>Cholesterol Level:</label>
            <span className={getCholesterolClass(formData.cholesterol)}>
              {formData.cholesterolInput} mg/dL
            </span>
          </div>
          {/* Add other relevant metrics */}
        </div>
      </div>

      <div className="suggestions-card">
        <h2>Recommendations</h2>
        <div className="suggestions-list">
          {suggestions?.map((suggestion, index) => (
            <div key={index} className="suggestion-item">
              <h3>{suggestion.title}</h3>
              <p>{suggestion.description}</p>
              {suggestion.target && (
                <p className="target-value">Target: {suggestion.target}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => navigate('/')} className="back-button">
        Back to Assessment
      </button>
    </div>
  );
};

const getBMIClass = (bmi) => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
};

const getCholesterolClass = (level) => {
  if (level === 1) return 'normal';
  if (level === 2) return 'warning';
  return 'danger';
};

export default Results; 