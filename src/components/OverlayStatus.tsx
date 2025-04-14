
import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, Shield, AlertCircle } from 'lucide-react';
import { useAppState } from './StateContext';
import { Button } from '@/components/ui/button';

const OverlayStatus = () => {
  const { currentStatus, currentThreatPercentage, activeOverlays } = useAppState();
  const [animate, setAnimate] = useState(false);

  // Trigger animation when status changes
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, [currentStatus]);

  const getStatusIcon = () => {
    switch (currentStatus) {
      case 'Protected':
        return <ShieldCheck className="h-12 w-12 text-success animate-pulse-glow" />;
      case 'Monitoring':
        return <Shield className="h-12 w-12 text-accent animate-pulse-glow" />;
      case 'Detected':
        return <ShieldAlert className="h-12 w-12 text-warning animate-pulse-glow" />;
      case 'Blocked':
        return <AlertCircle className="h-12 w-12 text-danger animate-pulse-glow" />;
      default:
        return <Shield className="h-12 w-12 text-accent" />;
    }
  };

  const getStatusColor = () => {
    switch (currentStatus) {
      case 'Protected': return 'text-success';
      case 'Monitoring': return 'text-accent';
      case 'Detected': return 'text-warning';
      case 'Blocked': return 'text-danger';
      default: return 'text-accent';
    }
  };

  const getActiveOverlaysClass = () => {
    if (activeOverlays === 0) return 'text-success';
    if (activeOverlays === 1) return 'text-warning';
    return 'text-danger';
  };

  return (
    <div className="grid-card flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">System Status</h2>
      
      <div className="flex justify-center items-center mb-6">
        {getStatusIcon()}
      </div>
      
      <div className={`text-2xl font-bold ${getStatusColor()} transition-all ${animate ? 'scale-110' : 'scale-100'}`}>
        {currentStatus}
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground text-center">
        Current threat level: <span className={`font-bold ${currentThreatPercentage > 70 ? 'text-danger' : currentThreatPercentage > 30 ? 'text-warning' : 'text-success'}`}>{currentThreatPercentage}%</span>
      </div>
      
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="text-sm">Active Overlays:</span>
        <span className={`font-bold ${getActiveOverlaysClass()}`}>{activeOverlays}</span>
      </div>
      
      <div className="mt-6">
        <Button 
          variant={activeOverlays > 0 ? "destructive" : "outline"} 
          size="sm"
          disabled={activeOverlays === 0}
          className={activeOverlays === 0 ? "opacity-50" : "animate-pulse"}
        >
          {activeOverlays > 0 ? "Block Overlays" : "No Overlays Detected"}
        </Button>
      </div>
    </div>
  );
};

export default OverlayStatus;
