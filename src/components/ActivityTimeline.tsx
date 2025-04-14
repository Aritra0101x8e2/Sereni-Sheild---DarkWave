
import React from 'react';
import { format } from 'date-fns';
import { Shield, ShieldAlert, ShieldCheck, AlertCircle, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { useAppState } from './StateContext';

const ActivityTimeline: React.FC = () => {
  const { threatEvents } = useAppState();
  const recentEvents = threatEvents.slice(0, 5);
  
  const getEventIcon = (event: any) => {
    if (event.status === 'active') {
      return <ShieldAlert className="h-5 w-5 text-danger" />;
    } else if (event.status === 'investigating') {
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    } else {
      if (event.threatLevel > 70) {
        return <Shield className="h-5 w-5 text-danger" />;
      } else if (event.threatLevel > 30) {
        return <Shield className="h-5 w-5 text-warning" />;
      } else {
        return <ShieldCheck className="h-5 w-5 text-success" />;
      }
    }
  };
  
  const getEventStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertCircle className="h-4 w-4 text-danger" />;
      case 'investigating':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="grid-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      
      <div className="space-y-4">
        {recentEvents.length > 0 ? (
          recentEvents.map((event) => (
            <div 
              key={event.id} 
              className="flex items-start gap-3 p-3 rounded-md bg-navy-dark/50 hover:bg-navy-dark/80 transition-colors"
            >
              <div className="mt-1">{getEventIcon(event)}</div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="font-medium truncate pr-2">{event.appName}</p>
                  <div className="flex items-center gap-1 text-xs">
                    {getEventStatusIcon(event.status)}
                    <span className="capitalize">{event.status}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1 truncate">{event.description}</p>
                
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span>{format(new Date(event.timestamp), 'MMM dd, HH:mm')}</span>
                  <span className={
                    event.threatLevel > 70 
                      ? 'text-danger' 
                      : event.threatLevel > 30 
                      ? 'text-warning' 
                      : 'text-success'
                  }>
                    Risk Level: {event.threatLevel}%
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No recent activity to display
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTimeline;
