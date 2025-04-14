
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  MonitoredApp, 
  ThreatEvent, 
  generateEventHistory, 
  generateThreatHistoryData, 
  getCurrentStatus, 
  getCurrentThreatPercentage,
  sampleMonitoredApps
} from '@/lib/mockData';

interface AppContextState {
  monitoredApps: MonitoredApp[];
  threatEvents: ThreatEvent[];
  currentStatus: string;
  currentThreatPercentage: number;
  threatHistoryData: any[];
  isScanning: boolean;
  updateAppMonitoring: (appId: string, isMonitoring: boolean) => void;
  addApp: (app: Omit<MonitoredApp, 'id' | 'lastChecked' | 'threatLevel'>) => void;
  startScan: () => void;
  activeOverlays: number;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [monitoredApps, setMonitoredApps] = useState<MonitoredApp[]>(sampleMonitoredApps);
  const [threatEvents, setThreatEvents] = useState<ThreatEvent[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>(getCurrentStatus());
  const [currentThreatPercentage, setCurrentThreatPercentage] = useState<number>(getCurrentThreatPercentage());
  const [threatHistoryData, setThreatHistoryData] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [activeOverlays, setActiveOverlays] = useState<number>(0);

  // Initialize data on component mount
  useEffect(() => {
    setThreatEvents(generateEventHistory());
    setThreatHistoryData(generateThreatHistoryData());
    
    // Randomly set active overlays (0-3)
    setActiveOverlays(Math.floor(Math.random() * 4));
    
    // Simulate periodic updates
    const interval = setInterval(() => {
      setCurrentStatus(getCurrentStatus());
      setCurrentThreatPercentage(getCurrentThreatPercentage());
      
      // Occasionally change active overlays
      if (Math.random() > 0.7) {
        setActiveOverlays(Math.floor(Math.random() * 4));
      }
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  const updateAppMonitoring = (appId: string, isMonitoring: boolean) => {
    setMonitoredApps(prevApps => 
      prevApps.map(app => 
        app.id === appId ? { ...app, isMonitoring, lastChecked: new Date() } : app
      )
    );
  };

  const addApp = (app: Omit<MonitoredApp, 'id' | 'lastChecked' | 'threatLevel'>) => {
    const newApp: MonitoredApp = {
      ...app,
      id: `app-${Date.now()}`,
      lastChecked: new Date(),
      threatLevel: Math.floor(Math.random() * 30), // Start with low threat level
    };
    
    setMonitoredApps(prevApps => [...prevApps, newApp]);
  };

  const startScan = () => {
    setIsScanning(true);
    
    // Simulate scan completion after 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      
      // Update threat percentage
      setCurrentThreatPercentage(getCurrentThreatPercentage());
      
      // Add a new scan event
      const newEvent: ThreatEvent = {
        id: `event-${Date.now()}`,
        timestamp: new Date(),
        appName: 'System Scan',
        threatLevel: Math.floor(Math.random() * 100),
        description: 'Manual system scan completed',
        actionTaken: 'No issues detected',
        status: 'resolved',
      };
      
      setThreatEvents(prevEvents => [newEvent, ...prevEvents]);
    }, 2000);
  };

  const value = {
    monitoredApps,
    threatEvents,
    currentStatus,
    currentThreatPercentage,
    threatHistoryData,
    isScanning,
    updateAppMonitoring,
    addApp,
    startScan,
    activeOverlays,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
