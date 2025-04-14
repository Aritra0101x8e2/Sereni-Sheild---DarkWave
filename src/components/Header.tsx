
import React from 'react';
import { Shield, ShieldAlert, Bell, Search } from 'lucide-react';
import { useAppState } from './StateContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { startScan, isScanning } = useAppState();

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-navy-light/50 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center space-x-2">
        <Shield className="h-8 w-8 text-accent" />
        <h1 className="text-xl font-bold text-white">Sereni Shield by DarkWave</h1>
      </div>
      
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={startScan}
          disabled={isScanning}
          className="flex items-center gap-2 border-accent/30 text-accent-light hover:bg-accent/10"
        >
          {isScanning ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-accent animate-spin"></div>
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              <span>Scan Now</span>
            </>
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="relative text-accent-light hover:bg-accent/10"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-danger"></span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-accent-light hover:bg-accent/10"
        >
          <ShieldAlert className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
