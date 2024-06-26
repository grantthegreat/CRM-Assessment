import React, { useState } from 'react';
import DroneOpsOptimizer from './DroneOpsOptimizer';
import DroneOpsLandingPage from './DroneOpsLandingPage';

function App() {
  const [showAssessment, setShowAssessment] = useState(false);

  const startAssessment = () => {
    setShowAssessment(true);
  };

  return (
    <div className="App">
      {showAssessment ? (
        <DroneOpsOptimizer />
      ) : (
        <DroneOpsLandingPage startAssessment={startAssessment} />
      )}
    </div>
  );
}

export default App;
