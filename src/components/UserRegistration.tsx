
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
    
    // Validate Indian phone number (10 digits, optionally starting with +91)
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Indian phone number",
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
      <Card className="shadow-md border-gray-200">
        <CardHeader className="pb-3 bg-gray-50 rounded-t-lg">
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="h-5 w-5 text-fraud-low" />
            Protected Account
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">
            Your account with phone number ending in {phoneNumber.slice(-4)} is protected.
            You will receive fraud alerts and spam protection.
          </p>
        </CardContent>
        <CardFooter className="border-t border-gray-100 pt-4">
          <Button variant="outline" onClick={() => onRegister('')} className="w-full hover:bg-gray-100">
            Change Phone Number
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-md border-gray-200">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="text-xl">Register for Protection</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Indian Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number (e.g., +91 XXXXXXXXXX)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                className="border-gray-300 focus:border-gray-400 focus:ring-gray-400"
                required
              />
              <p className="text-xs text-muted-foreground">
                We'll use this to send you fraud alerts and block spam messages
              </p>
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-gray-800 hover:bg-gray-700 text-white"
            >
              {isSubmitting ? "Registering..." : "Register for Protection"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserRegistration;
