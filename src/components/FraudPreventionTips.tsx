
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert, CreditCard, Smartphone, UserCog, Globe, AlertTriangle } from 'lucide-react';

const FraudPreventionTips = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Fraud Prevention Tips</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Verify Recipients</AlertTitle>
          <AlertDescription>
            Always double-check UPI IDs before making payments, especially for first-time recipients.
          </AlertDescription>
        </Alert>

        <Alert>
          <CreditCard className="h-4 w-4" />
          <AlertTitle>Monitor Transactions</AlertTitle>
          <AlertDescription>
            Regularly check your transaction history and enable notifications for all UPI transactions.
          </AlertDescription>
        </Alert>

        <Alert>
          <Smartphone className="h-4 w-4" />
          <AlertTitle>Secure Your Device</AlertTitle>
          <AlertDescription>
            Keep your device protected with screen locks and updated security patches.
          </AlertDescription>
        </Alert>

        <Alert>
          <UserCog className="h-4 w-4" />
          <AlertTitle>Strong Passwords</AlertTitle>
          <AlertDescription>
            Use strong, unique passwords for your UPI PIN and never share them.
          </AlertDescription>
        </Alert>

        <Alert>
          <Globe className="h-4 w-4" />
          <AlertTitle>Be Cautious on Public Networks</AlertTitle>
          <AlertDescription>
            Avoid making UPI transactions when connected to public Wi-Fi networks.
          </AlertDescription>
        </Alert>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Report Suspicious Activity</AlertTitle>
          <AlertDescription>
            If you notice any suspicious transactions, report them immediately to your bank.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default FraudPreventionTips;
