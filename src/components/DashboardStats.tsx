
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/utils/data-generator';
import { AnomalyDetector } from '@/utils/anomaly-detection';
import { Shield, MessageSquareX, ShieldCheck, AlertCircle } from 'lucide-react';

interface DashboardStatsProps {
  transactions: Transaction[];
  anomalyDetector: AnomalyDetector;
  blockedSpam?: number;
  isRegistered?: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  transactions, 
  anomalyDetector, 
  blockedSpam = 0,
  isRegistered = false
}) => {
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
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Protection Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {isRegistered ? (
              <>
                <ShieldCheck className="h-5 w-5 text-fraud-low" />
                <div className="text-xl font-bold text-fraud-low">Active</div>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-fraud-high" />
                <div className="text-xl font-bold text-fraud-high">Inactive</div>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {isRegistered 
              ? "Your account is protected against fraud and spam" 
              : "Register to enable fraud alerts and spam protection"}
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
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
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
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <MessageSquareX className="h-4 w-4" />
            Spam Blocked
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-fraud-low">{blockedSpam}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {isRegistered 
              ? "Spam messages blocked" 
              : "Register to enable spam protection"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
