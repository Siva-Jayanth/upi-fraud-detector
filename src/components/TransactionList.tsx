
import React from 'react';
import { Transaction } from '@/utils/data-generator';
import { AnomalyDetector } from '@/utils/anomaly-detection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Shield, ShieldAlert, PhoneOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TransactionListProps {
  transactions: Transaction[];
  anomalyDetector: AnomalyDetector;
  userPhoneNumber?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  anomalyDetector,
  userPhoneNumber 
}) => {
  const { toast } = useToast();

  const handleBlockTransaction = (transaction: Transaction) => {
    toast({
      title: "Transaction Blocked",
      description: `The transaction of ₹${transaction.amount} to ${transaction.receiver} has been blocked`,
      variant: "default",
    });
  };

  const handleVerifyTransaction = (transaction: Transaction) => {
    toast({
      title: "Transaction Verified",
      description: `The transaction of ₹${transaction.amount} to ${transaction.receiver} has been verified as legitimate`,
      variant: "default",
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Recent Transactions</CardTitle>
        {!userPhoneNumber && (
          <Badge variant="outline" className="flex items-center gap-1">
            <PhoneOff className="h-3 w-3" />
            <span className="text-xs">Not Protected</span>
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {transactions.map((transaction) => {
              const { risk, score, explanation } = anomalyDetector.classifyTransaction(transaction);
              const isCritical = risk === 'critical';
              const isHigh = risk === 'high';
              
              return (
                <div 
                  key={transaction.id}
                  className={`p-4 rounded-lg border ${
                    isCritical ? 'border-fraud-critical bg-red-50' :
                    isHigh ? 'border-fraud-high bg-red-50/50' :
                    risk === 'medium' ? 'border-fraud-medium bg-yellow-50/50' :
                    'border-fraud-low bg-green-50/30'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        ₹{transaction.amount.toLocaleString()} 
                        <span className="text-sm font-normal text-muted-foreground">
                          {transaction.sender} → {transaction.receiver}
                        </span>
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {transaction.timestamp.toLocaleString()} • {transaction.location} • {transaction.device}
                      </p>
                    </div>
                    <Badge 
                      className={`
                        ${isCritical ? 'bg-fraud-critical' :
                          isHigh ? 'bg-fraud-high' :
                          risk === 'medium' ? 'bg-fraud-medium' :
                          'bg-fraud-low'}
                      `}
                    >
                      {isCritical ? 'Critical Risk' :
                       isHigh ? 'High Risk' :
                       risk === 'medium' ? 'Medium Risk' :
                       'Low Risk'} ({Math.round(score * 100)}%)
                    </Badge>
                  </div>
                  
                  {(isHigh || isCritical) && (
                    <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                      <p className="font-semibold flex items-center gap-1">
                        <ShieldAlert className="h-4 w-4" />
                        Fraud Alert:
                      </p>
                      <ul className="list-disc pl-5 mt-1">
                        {explanation.map((reason, i) => (
                          <li key={i}>{reason}</li>
                        ))}
                      </ul>
                      
                      {userPhoneNumber && (
                        <div className="flex items-center gap-2 mt-3">
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleBlockTransaction(transaction)}
                            className="w-full"
                          >
                            Block Transaction
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleVerifyTransaction(transaction)}
                            className="w-full"
                          >
                            Verify as Legitimate
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!userPhoneNumber && (isHigh || isCritical) && (
                    <div className="mt-3 flex items-center justify-center p-2 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Register your phone number to block suspicious transactions
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
