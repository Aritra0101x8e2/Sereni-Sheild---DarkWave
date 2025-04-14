
import React, { useEffect, useState } from 'react';
import { useAppState } from './StateContext';

const ThreatMeter: React.FC = () => {
  const { currentThreatPercentage } = useAppState();
  const [percent, setPercent] = useState(0);
  
  // Animate percentage on change
  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev < currentThreatPercentage) {
          return Math.min(prev + 1, currentThreatPercentage);
        } else if (prev > currentThreatPercentage) {
          return Math.max(prev - 1, currentThreatPercentage);
        }
        return prev;
      });
    }, 10);
    
    return () => clearInterval(interval);
  }, [currentThreatPercentage]);
  
  const getColor = () => {
    if (percent <= 30) return 'text-success';
    if (percent <= 70) return 'text-warning';
    return 'text-danger';
  };
  
  const getDescription = () => {
    if (percent <= 20) return 'Safe';
    if (percent <= 40) return 'Low Risk';
    if (percent <= 60) return 'Moderate Risk';
    if (percent <= 80) return 'High Risk';
    return 'Critical Risk';
  };
  
  // Calculate the stroke dash offset for the circular progress
  const circleRadius = 70;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  
  return (
    <div className="grid-card flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold mb-4">Threat Predictor</h2>
      
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={circleRadius}
            className="stroke-navy-light"
            strokeWidth="12"
            fill="none"
          />
          
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r={circleRadius}
            className={`${getColor()}`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        
        {/* Percentage and text in the center */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getColor()}`}>{percent}%</span>
          <span className={`text-sm mt-1 ${getColor()}`}>{getDescription()}</span>
        </div>
      </div>
      
      <div className="w-full mt-6 px-4">
        <div className="flex justify-between text-xs">
          <span className="text-success">Safe</span>
          <span className="text-warning">Moderate</span>
          <span className="text-danger">Critical</span>
        </div>
        
        <div className="h-2 w-full bg-navy-dark rounded-full mt-1 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              percent <= 30 ? 'bg-success' : percent <= 70 ? 'bg-warning' : 'bg-danger'
            }`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMeter;
