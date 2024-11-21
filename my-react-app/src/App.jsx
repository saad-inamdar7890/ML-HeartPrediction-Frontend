import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HealthPredictionForm from './components/HealthPredictionForm'
import Results from './components/Results'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HealthPredictionForm />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App