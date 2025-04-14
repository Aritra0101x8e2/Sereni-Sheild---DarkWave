
import React from 'react';
import Header from '@/components/Header';
import OverlayStatus from '@/components/OverlayStatus';
import ThreatMeter from '@/components/ThreatMeter';
import ActivityTimeline from '@/components/ActivityTimeline';
import AppSelector from '@/components/AppSelector';
import ThreatChart from '@/components/ThreatChart';
import { AppStateProvider } from '@/components/StateContext';

const Index = () => {
  return (
    <AppStateProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ThreatChart />
            </div>
            
            <div>
              <ThreatMeter />
            </div>
            
            <div>
              <OverlayStatus />
            </div>
            
            <div>
              <AppSelector />
            </div>
            
            <div className="md:col-span-1">
              <ActivityTimeline />
            </div>
          </div>
        </main>
      </div>
    </AppStateProvider>
  );
};

export default Index;
