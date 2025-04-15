
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ShieldAlert, ShieldCheck, ShieldOff, Phone, Lock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const ProtectionPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [features, setFeatures] = useState({
    fraudAlerts: true,
    spamBlocking: true,
    transactionMonitoring: true,
    aiImageDetection: false,
    realTimeNotifications: true,
  });
  const { toast } = useToast();

  const handleRegister = () => {
    // Validate Indian phone number
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Indian phone number",
        variant: "destructive",
      });
      return;
    }

    setIsRegistered(true);
    toast({
      title: "Protection Activated",
      description: "Your UPI transactions are now being monitored for fraud",
    });
  };

  const toggleFeature = (feature: keyof typeof features) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-gray-800" />
        <h1 className="text-3xl font-bold">Protection Center</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isRegistered ? 
                  <ShieldCheck className="h-5 w-5 text-fraud-low" /> : 
                  <ShieldOff className="h-5 w-5 text-fraud-high" />
                }
                Protection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isRegistered ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-green-700">Protection Active</h3>
                        <p className="text-sm text-green-600">Your UPI transactions are being monitored</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsRegistered(false);
                        toast({
                          title: "Protection Deactivated",
                          description: "Your UPI fraud protection has been turned off",
                        });
                      }}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Disable
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Protected Phone Number</h3>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{phoneNumber}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Protection Features</h3>
                    <div className="space-y-4">
                      {Object.entries(features).map(([key, enabled]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`h-8 w-8 rounded-md flex items-center justify-center ${enabled ? 'bg-gray-100' : 'bg-gray-50'}`}>
                              {key === 'fraudAlerts' && <ShieldAlert className={`h-4 w-4 ${enabled ? 'text-gray-700' : 'text-gray-400'}`} />}
                              {key === 'spamBlocking' && <Phone className={`h-4 w-4 ${enabled ? 'text-gray-700' : 'text-gray-400'}`} />}
                              {key === 'transactionMonitoring' && <Lock className={`h-4 w-4 ${enabled ? 'text-gray-700' : 'text-gray-400'}`} />}
                              {key === 'aiImageDetection' && <Shield className={`h-4 w-4 ${enabled ? 'text-gray-700' : 'text-gray-400'}`} />}
                              {key === 'realTimeNotifications' && <Bell className={`h-4 w-4 ${enabled ? 'text-gray-700' : 'text-gray-400'}`} />}
                            </div>
                            <Label htmlFor={`toggle-${key}`} className="cursor-pointer">
                              {key === 'fraudAlerts' && 'Fraud Alerts'}
                              {key === 'spamBlocking' && 'Spam Blocking'}
                              {key === 'transactionMonitoring' && 'Transaction Monitoring'}
                              {key === 'aiImageDetection' && 'AI Image Detection'}
                              {key === 'realTimeNotifications' && 'Real-time Notifications'}
                            </Label>
                          </div>
                          <Switch 
                            id={`toggle-${key}`}
                            checked={enabled}
                            onCheckedChange={() => toggleFeature(key as keyof typeof features)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <ShieldOff className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-red-700">Protection Inactive</h3>
                        <p className="text-sm text-red-600">Your UPI transactions are not being monitored</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Register Your Phone Number</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter your Indian phone number to activate UPI fraud protection
                    </p>
                    <div className="flex gap-3">
                      <Input
                        placeholder="+91 XXXX XXXX XX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleRegister}>
                        Activate Protection
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your phone number is used to monitor UPI transactions and detect potential fraud.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How Protection Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <span className="font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Register Your Phone</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter your phone number to enable real-time monitoring of UPI transactions
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <span className="font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">AI Monitoring</h3>
                    <p className="text-sm text-muted-foreground">
                      Our machine learning system analyzes your transactions to identify unusual patterns
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <span className="font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Real-time Alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive immediate notifications when suspicious activities are detected
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <span className="font-medium">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Spam Protection</h3>
                    <p className="text-sm text-muted-foreground">
                      Block fraudulent messages before they reach your phone
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Protection Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="text-sm text-muted-foreground">Total Transactions Monitored</div>
                  <div className="text-2xl font-bold">{isRegistered ? '247' : '0'}</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="text-sm text-muted-foreground">Suspicious Activities Detected</div>
                  <div className="text-2xl font-bold text-fraud-high">{isRegistered ? '12' : '0'}</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="text-sm text-muted-foreground">Spam Messages Blocked</div>
                  <div className="text-2xl font-bold text-fraud-medium">{isRegistered ? '35' : '0'}</div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="text-sm text-muted-foreground">Amount Protected</div>
                  <div className="text-2xl font-bold text-fraud-low">₹{isRegistered ? '47,500' : '0'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {isRegistered ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-md">
                    <ShieldAlert className="h-5 w-5 text-fraud-high" />
                    <div>
                      <div className="text-sm font-medium">Suspicious transaction blocked</div>
                      <div className="text-xs text-muted-foreground">Today, 10:24 AM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-md">
                    <Bell className="h-5 w-5 text-fraud-medium" />
                    <div>
                      <div className="text-sm font-medium">Spam message blocked</div>
                      <div className="text-xs text-muted-foreground">Yesterday, 3:15 PM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-md">
                    <ShieldCheck className="h-5 w-5 text-fraud-low" />
                    <div>
                      <div className="text-sm font-medium">Protection activated</div>
                      <div className="text-xs text-muted-foreground">2 days ago</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <ShieldOff className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    No protection activity to display
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Register your phone number to enable protection
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProtectionPage;
