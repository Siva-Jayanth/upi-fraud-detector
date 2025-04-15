
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from 'lucide-react';

interface SignUpFormProps {
  onSignUp: (name: string, email: string, password: string, phoneNumber: string) => void;
  onSwitchToSignIn: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, onSwitchToSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validations
    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Validate Indian phone number
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
    
    // Simulate registration
    setTimeout(() => {
      onSignUp(name, email, password, phoneNumber);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <Card className="shadow-md border-gray-200 w-full max-w-md mx-auto transition-all duration-300 ease-in-out">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="text-xl flex items-center justify-center gap-2">
          <UserPlus className="h-5 w-5" />
          Create Account
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-300 focus:border-gray-400 focus:ring-gray-400 transition-all duration-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border-gray-300 focus:border-gray-400 focus:ring-gray-400 transition-all duration-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number (e.g., +91 XXXXXXXXXX)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                className="border-gray-300 focus:border-gray-400 focus:ring-gray-400 transition-all duration-200"
                required
              />
              <p className="text-xs text-gray-500">
                Must be a valid Indian phone number (e.g., +91 9876543210)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signupPassword">Password</Label>
              <Input
                id="signupPassword"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border-gray-300 focus:border-gray-400 focus:ring-gray-400 transition-all duration-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="border-gray-300 focus:border-gray-400 focus:ring-gray-400 transition-all duration-200"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-gray-800 hover:bg-gray-700 text-white mt-2 transition-colors duration-300"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-4 flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Button 
            variant="link" 
            onClick={onSwitchToSignIn} 
            className="p-0 h-auto text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Sign In
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
