
import React from 'react';
import { Transaction } from '@/utils/data-generator';
import { AnomalyDetector } from '@/utils/anomaly-detection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TransactionListProps {
  transactions: Transaction[];
  anomalyDetector: AnomalyDetector;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, anomalyDetector }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {transactions.map((transaction) => {
              const { risk, score } = anomalyDetector.classifyTransaction(transaction);
              
              return (
                <div 
                  key={transaction.id}
                  className={`p-4 rounded-lg border ${
                    risk === 'critical' ? 'border-fraud-critical bg-red-50' :
                    risk === 'high' ? 'border-fraud-high bg-red-50/50' :
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
                        ${risk === 'critical' ? 'bg-fraud-critical' :
                          risk === 'high' ? 'bg-fraud-high' :
                          risk === 'medium' ? 'bg-fraud-medium' :
                          'bg-fraud-low'}
                      `}
                    >
                      {risk === 'critical' ? 'Critical Risk' :
                       risk === 'high' ? 'High Risk' :
                       risk === 'medium' ? 'Medium Risk' :
                       'Low Risk'} ({Math.round(score * 100)}%)
                    </Badge>
                  </div>
                  
                  {(risk === 'high' || risk === 'critical') && (
                    <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                      <p className="font-semibold">Fraud Alert:</p>
                      <ul className="list-disc pl-5 mt-1">
                        {anomalyDetector.classifyTransaction(transaction).explanation.map((reason, i) => (
                          <li key={i}>{reason}</li>
                        ))}
                      </ul>
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
