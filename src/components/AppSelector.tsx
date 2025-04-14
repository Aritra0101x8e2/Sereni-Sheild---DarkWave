
import React, { useState } from 'react';
import { useAppState } from './StateContext';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Smartphone, Globe, Lock, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';

const AppSelector: React.FC = () => {
  const { monitoredApps, updateAppMonitoring, addApp } = useAppState();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newAppName, setNewAppName] = useState('');
  const [newAppType, setNewAppType] = useState<'app' | 'website'>('app');
  const [sensitiveFields, setSensitiveFields] = useState('password, OTP');
  const [expanded, setExpanded] = useState(true);
  
  const handleToggleApp = (appId: string, isMonitoring: boolean) => {
    updateAppMonitoring(appId, isMonitoring);
  };
  
  const handleAddApp = () => {
    if (!newAppName.trim()) return;
    
    addApp({
      name: newAppName.trim(),
      type: newAppType,
      isMonitoring: true,
      sensitiveFields: sensitiveFields.split(',').map(field => field.trim()).filter(Boolean),
    });
    
    // Reset form and close dialog
    setNewAppName('');
    setNewAppType('app');
    setSensitiveFields('password, OTP');
    setShowAddDialog(false);
  };
  
  const getAppIcon = (type: string) => {
    return type === 'app' ? 
      <Smartphone className="h-4 w-4 text-accent" /> : 
      <Globe className="h-4 w-4 text-accent" />;
  };
  
  const getThreatLevelIndicator = (level: number) => {
    if (level > 70) {
      return <ShieldAlert className="h-4 w-4 text-danger" />;
    } else if (level > 30) {
      return <ShieldAlert className="h-4 w-4 text-warning" />;
    } else {
      return <Lock className="h-4 w-4 text-success" />;
    }
  };
  
  return (
    <div className="grid-card">
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer" 
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="text-lg font-semibold">Protected Apps & Websites</h2>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {expanded && (
        <>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1 scrollbar-none">
            {monitoredApps.map((app) => (
              <div 
                key={app.id} 
                className={`flex items-center justify-between p-3 rounded-md ${
                  app.isMonitoring ? 'bg-navy-dark/70' : 'bg-navy-dark/30'
                } transition-colors`}
              >
                <div className="flex items-center gap-3">
                  {getAppIcon(app.type)}
                  <div>
                    <p className="font-medium">{app.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {app.sensitiveFields.slice(0, 2).join(', ')}
                      {app.sensitiveFields.length > 2 && '...'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {getThreatLevelIndicator(app.threatLevel)}
                  <Switch
                    checked={app.isMonitoring}
                    onCheckedChange={(checked) => handleToggleApp(app.id, checked)}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-center">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add New App/Website</span>
                </Button>
              </DialogTrigger>
              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Protection Target</DialogTitle>
                  <DialogDescription>
                    Add a new app or website to monitor for overlay attacks.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input 
                      placeholder="App or website name" 
                      value={newAppName}
                      onChange={(e) => setNewAppName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          id="type-app" 
                          checked={newAppType === 'app'} 
                          onChange={() => setNewAppType('app')}
                          className="text-accent focus:ring-accent"
                        />
                        <label htmlFor="type-app">App</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          id="type-website" 
                          checked={newAppType === 'website'} 
                          onChange={() => setNewAppType('website')}
                          className="text-accent focus:ring-accent"
                        />
                        <label htmlFor="type-website">Website</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sensitive Fields (comma separated)</label>
                    <Input 
                      placeholder="password, OTP, account number" 
                      value={sensitiveFields}
                      onChange={(e) => setSensitiveFields(e.target.value)}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddApp}>
                    Add Protection
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
};

export default AppSelector;
