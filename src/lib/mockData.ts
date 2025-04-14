
import { subDays, format, subHours, addMinutes } from 'date-fns';

export interface ThreatEvent {
  id: string;
  timestamp: Date;
  appName: string;
  threatLevel: number;
  description: string;
  actionTaken: string;
  status: 'active' | 'resolved' | 'investigating';
}

export interface MonitoredApp {
  id: string;
  name: string;
  type: 'app' | 'website';
  isMonitoring: boolean;
  sensitiveFields: string[];
  lastChecked: Date;
  threatLevel: number;
}

export const getRandomThreatLevel = (): number => {
  return Math.floor(Math.random() * 100);
};

// Generate event history
export const generateEventHistory = (): ThreatEvent[] => {
  const events: ThreatEvent[] = [];
  const now = new Date();
  
  // Last 7 days of events
  for (let i = 0; i < 20; i++) {
    const daysAgo = Math.floor(Math.random() * 7);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    
    const timestamp = subDays(now, daysAgo);
    const adjustedTime = subHours(timestamp, hoursAgo);
    const finalTime = addMinutes(adjustedTime, minutesAgo);
    
    const threatLevel = getRandomThreatLevel();
    const app = sampleMonitoredApps[Math.floor(Math.random() * sampleMonitoredApps.length)];
    
    let description, actionTaken, status;
    
    if (threatLevel < 30) {
      description = 'Low-risk overlay detected';
      actionTaken = 'Logged for analysis';
      status = 'resolved';
    } else if (threatLevel < 70) {
      description = 'Medium-risk overlay detected during sensitive operation';
      actionTaken = 'User alerted';
      status = Math.random() > 0.7 ? 'investigating' : 'resolved';
    } else {
      description = 'High-risk overlay detected attempting to capture sensitive data';
      actionTaken = 'Blocked and reported';
      status = Math.random() > 0.3 ? 'resolved' : 'active';
    }
    
    events.push({
      id: `event-${i}`,
      timestamp: finalTime,
      appName: app.name,
      threatLevel,
      description,
      actionTaken,
      status: status as 'active' | 'resolved' | 'investigating',
    });
  }
  
  // Sort by timestamp, most recent first
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Sample list of apps/websites to monitor
export const sampleMonitoredApps: MonitoredApp[] = [
  {
    id: 'app-1',
    name: 'Banking App',
    type: 'app',
    isMonitoring: true,
    sensitiveFields: ['password', 'OTP', 'account number'],
    lastChecked: new Date(),
    threatLevel: 15,
  },
  {
    id: 'app-2',
    name: 'Payment Wallet',
    type: 'app',
    isMonitoring: true,
    sensitiveFields: ['password', 'OTP', 'card details'],
    lastChecked: new Date(),
    threatLevel: 42,
  },
  {
    id: 'app-3',
    name: 'Email Client',
    type: 'app',
    isMonitoring: false,
    sensitiveFields: ['password'],
    lastChecked: new Date(),
    threatLevel: 8,
  },
  {
    id: 'web-1',
    name: 'Online Banking',
    type: 'website',
    isMonitoring: true,
    sensitiveFields: ['password', 'OTP', 'security questions'],
    lastChecked: new Date(),
    threatLevel: 67,
  },
  {
    id: 'web-2',
    name: 'E-commerce Site',
    type: 'website',
    isMonitoring: true,
    sensitiveFields: ['password', 'card details'],
    lastChecked: new Date(),
    threatLevel: 29,
  },
  {
    id: 'web-3',
    name: 'Social Media',
    type: 'website',
    isMonitoring: false,
    sensitiveFields: ['password'],
    lastChecked: new Date(),
    threatLevel: 18,
  },
];

// Generate threat history data for charts
export const generateThreatHistoryData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = subDays(now, i);
    const dateStr = format(date, 'MMM dd');
    
    // Generate random values but with some patterns
    const overlaysDetected = Math.floor(Math.random() * 10) + (i === 0 ? 5 : 0);
    const highRiskEvents = Math.floor(Math.random() * overlaysDetected);
    const blockedAttempts = Math.floor(Math.random() * highRiskEvents);
    
    data.push({
      date: dateStr,
      overlaysDetected,
      highRiskEvents,
      blockedAttempts,
    });
  }
  
  return data;
};

// Generate real-time overlay status
export const getCurrentStatus = () => {
  const statuses = ['Protected', 'Monitoring', 'Detected', 'Blocked'];
  const randomIndex = Math.floor(Math.random() * 10);
  
  // Make "Protected" and "Monitoring" more likely
  if (randomIndex < 6) {
    return statuses[0]; // Protected
  } else if (randomIndex < 8) {
    return statuses[1]; // Monitoring
  } else if (randomIndex < 9) {
    return statuses[2]; // Detected
  } else {
    return statuses[3]; // Blocked
  }
};

// Get current threat percentage (0-100)
export const getCurrentThreatPercentage = () => {
  return Math.floor(Math.random() * 100);
};

// Current events for the timeline - subset of most recent events
export const getRecentEvents = (events: ThreatEvent[], count: number = 5) => {
  return events.slice(0, count);
};
