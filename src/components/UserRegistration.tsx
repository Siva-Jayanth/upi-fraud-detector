
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Shield } from 'lucide-react';

interface UserRegistrationProps {
  onRegister: (phoneNumber: string) => void;
  isRegistered: boolean;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister, isRegistered }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onRegister(phoneNumber);
      toast({
        title: "Registration Successful",
        description: "You will now receive fraud alerts and spam protection",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  if (isRegistered) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="h-5 w-5 text-fraud-low" />
            Protected Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your account with phone number ending in {phoneNumber.slice(-4)} is protected.
            You will receive fraud alerts and spam protection.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => onRegister('')} className="w-full">
            Change Phone Number
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Register for Protection</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                pattern="[0-9]{10}"
                required
              />
              <p className="text-xs text-muted-foreground">
                We'll use this to send you fraud alerts and block spam messages
              </p>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register for Protection"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserRegistration;
