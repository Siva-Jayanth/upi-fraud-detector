
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { LogIn } from 'lucide-react';

interface SignInFormProps {
  onSignIn: (email: string, password: string) => void;
  onSwitchToSignUp: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSignIn, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Invalid Credentials",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate authentication
    setTimeout(() => {
      onSignIn(email, password);
      toast({
        title: "Sign In Successful",
        description: "Welcome back to UPI Fraud Shield",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="shadow-md border-gray-200 w-full max-w-md mx-auto">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="text-xl flex items-center justify-center gap-2">
          <LogIn className="h-5 w-5" />
          Sign In
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border-gray-300 focus:border-gray-400 focus:ring-gray-400"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border-gray-300 focus:border-gray-400 focus:ring-gray-400"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-gray-800 hover:bg-gray-700 text-white"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t border-gray-100 pt-4 flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Button 
            variant="link" 
            onClick={onSwitchToSignUp} 
            className="p-0 h-auto text-gray-600 hover:text-gray-900"
          >
            Sign Up
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
