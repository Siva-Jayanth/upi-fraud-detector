
import React, { useState, useEffect } from 'react';
import { initialTransactions, Transaction, generateTransactionBatch } from '@/utils/data-generator';
import { AnomalyDetector } from '@/utils/anomaly-detection';
import TransactionList from '@/components/TransactionList';
import DashboardStats from '@/components/DashboardStats';
import AnomalyChart from '@/components/AnomalyChart';
import TransactionSimulator from '@/components/TransactionSimulator';
import FraudPreventionTips from '@/components/FraudPreventionTips';

const Index = () => {
  // Initialize with some random transactions
  const [transactions, setTransactions] = useState<Transaction[]>([...initialTransactions]);
  
  // Initialize the anomaly detector
  const [anomalyDetector] = useState(() => new AnomalyDetector(initialTransactions));
  
  // Handle new transactions
  const handleNewTransaction = (transaction: Transaction) => {
    // Add to the detector first
    anomalyDetector.addTransaction(transaction);
    
    // Update the state with the new transaction at the beginning
    setTransactions(prevTransactions => [transaction, ...prevTransactions].slice(0, 100));
  };
  
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">UPI SafeGuard - Real-time Fraud Detection</h1>
          <p className="text-muted-foreground mt-2">
            Using unsupervised machine learning to detect and prevent UPI payment fraud
          </p>
        </header>
        
        <DashboardStats 
          transactions={transactions}
          anomalyDetector={anomalyDetector}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <AnomalyChart 
              transactions={transactions}
              anomalyDetector={anomalyDetector}
            />
          </div>
          <div>
            <TransactionSimulator 
              onNewTransaction={handleNewTransaction}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            <TransactionList 
              transactions={transactions}
              anomalyDetector={anomalyDetector}
            />
          </div>
          <div>
            <FraudPreventionTips />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
