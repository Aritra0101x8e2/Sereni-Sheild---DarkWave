
import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { useAppState } from './StateContext';

const ThreatChart: React.FC = () => {
  const { threatHistoryData } = useAppState();
  
  return (
    <div className="grid-card">
      <h2 className="text-lg font-semibold mb-4">Threat Analysis</h2>
      
      <div>
        <div className="h-72 -mx-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={threatHistoryData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorOverlays" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3A85FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3A85FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorHighRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFC107" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FFC107" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4757" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF4757" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3142" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#CAD1D9' }} />
              <YAxis tick={{ fill: '#CAD1D9' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1F2C', 
                  borderColor: '#3A85FF', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }} 
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Area 
                type="monotone" 
                dataKey="overlaysDetected" 
                name="Overlays Detected"
                stroke="#3A85FF" 
                fillOpacity={1} 
                fill="url(#colorOverlays)" 
              />
              <Area 
                type="monotone" 
                dataKey="highRiskEvents" 
                name="High Risk"
                stroke="#FFC107" 
                fillOpacity={1} 
                fill="url(#colorHighRisk)" 
              />
              <Area 
                type="monotone" 
                dataKey="blockedAttempts" 
                name="Blocked"
                stroke="#FF4757" 
                fillOpacity={1} 
                fill="url(#colorBlocked)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ThreatChart;
