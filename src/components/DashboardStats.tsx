
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/utils/data-generator';
import { AnomalyDetector } from '@/utils/anomaly-detection';

interface DashboardStatsProps {
  transactions: Transaction[];
  anomalyDetector: AnomalyDetector;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ transactions, anomalyDetector }) => {
  const getTransactionStats = () => {
    const stats = {
      total: transactions.length,
      fraudulent: 0,
      high: 0,
      medium: 0,
      low: 0,
      totalAmount: 0,
      blockedAmount: 0,
    };

    transactions.forEach(transaction => {
      const { risk, isFraudulent } = anomalyDetector.classifyTransaction(transaction);
      stats.totalAmount += transaction.amount;

      if (isFraudulent) {
        stats.fraudulent += 1;
        stats.blockedAmount += transaction.amount;
      }

      if (risk === 'high') stats.high += 1;
      else if (risk === 'medium') stats.medium += 1;
      else if (risk === 'low') stats.low += 1;
    });

    return stats;
  };

  const stats = getTransactionStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Last 24 hours
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Transaction Amount
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.totalAmount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Total amount processed
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Fraud Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-fraud-critical">{stats.fraudulent}</div>
          <div className="flex items-center mt-1">
            <span className="text-xs text-muted-foreground">
              {stats.fraudulent > 0 ? 
                `${((stats.fraudulent / stats.total) * 100).toFixed(1)}% of transactions` : 
                'No fraud detected'}
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Amount Saved
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-fraud-low">₹{stats.blockedAmount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Protected from fraudulent transactions
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
