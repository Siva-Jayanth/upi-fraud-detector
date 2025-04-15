
import React, { useState, useEffect } from 'react';
import { initialTransactions, Transaction, generateTransactionBatch } from '@/utils/data-generator';
import { AnomalyDetector } from '@/utils/anomaly-detection';
import { SpamDetector, generateRandomSpamMessage } from '@/utils/spam-detection';
import TransactionList from '@/components/TransactionList';
import DashboardStats from '@/components/DashboardStats';
import AnomalyChart from '@/components/AnomalyChart';
import TransactionSimulator from '@/components/TransactionSimulator';
import FraudPreventionTips from '@/components/FraudPreventionTips';
import UserRegistration from '@/components/UserRegistration';
import NotificationCenter, { Notification } from '@/components/NotificationCenter';
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  // Initialize with some random transactions
  const [transactions, setTransactions] = useState<Transaction[]>([...initialTransactions]);
  
  // Initialize the anomaly detector and spam detector
  const [anomalyDetector] = useState(() => new AnomalyDetector(initialTransactions));
  const [spamDetector] = useState(() => new SpamDetector());
  
  // User registration state
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [blockedSpam, setBlockedSpam] = useState<number>(0);
  const { toast } = useToast();
  
  // Handle user registration
  const handleRegister = (phoneNumber: string) => {
    setUserPhoneNumber(phoneNumber);
    
    // If unregistering, clear notifications
    if (!phoneNumber) {
      setNotifications([]);
      return;
    }
    
    // Add welcome notification
    const welcomeNotification: Notification = {
      id: uuidv4(),
      type: 'info',
      title: 'Welcome to UPI SafeGuard',
      message: 'You will now receive fraud alerts and spam protection.',
      timestamp: new Date(),
      isRead: false
    };
    
    setNotifications([welcomeNotification]);
  };
  
  // Handle marking notifications as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };
  
  // Handle new transactions
  const handleNewTransaction = (transaction: Transaction) => {
    // Add to the detector first
    anomalyDetector.addTransaction(transaction);
    
    // Update the state with the new transaction at the beginning
    setTransactions(prevTransactions => [transaction, ...prevTransactions].slice(0, 100));
    
    // If user is registered, check for fraud and notify
    if (userPhoneNumber) {
      const { risk, isFraudulent, explanation } = anomalyDetector.classifyTransaction(transaction);
      
      if (risk === 'high' || risk === 'critical') {
        // Create a fraud alert notification
        const fraudNotification: Notification = {
          id: uuidv4(),
          type: 'fraud-alert',
          title: `Suspicious Transaction Detected: ₹${transaction.amount}`,
          message: explanation.join('. '),
          timestamp: new Date(),
          isRead: false
        };
        
        setNotifications(prev => [fraudNotification, ...prev]);
        
        // Show a toast alert
        toast({
          title: "Potential Fraud Detected",
          description: `A suspicious transaction of ₹${transaction.amount} was flagged`,
          variant: "destructive",
        });
      }
    }
  };
  
  // Simulate spam messages periodically if user is registered
  useEffect(() => {
    if (!userPhoneNumber) return;
    
    const spamInterval = setInterval(() => {
      // 20% chance of receiving a spam message
      if (Math.random() < 0.2) {
        const spamMessage = generateRandomSpamMessage();
        const { isSpam, reason } = spamDetector.isSpam(spamMessage.message, spamMessage.sender);
        
        if (isSpam) {
          // Create spam blocked notification
          const spamNotification: Notification = {
            id: uuidv4(),
            type: 'spam-blocked',
            title: `Spam Message Blocked from ${spamMessage.sender}`,
            message: `${reason}: "${spamMessage.message.substring(0, 50)}..."`,
            timestamp: new Date(),
            isRead: false
          };
          
          setNotifications(prev => [spamNotification, ...prev]);
          setBlockedSpam(prev => prev + 1);
        }
      }
    }, 10000); // Check every 10 seconds
    
    return () => clearInterval(spamInterval);
  }, [userPhoneNumber, spamDetector]);
  
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
          blockedSpam={blockedSpam}
          isRegistered={!!userPhoneNumber}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <AnomalyChart 
              transactions={transactions}
              anomalyDetector={anomalyDetector}
            />
          </div>
          <div>
            {userPhoneNumber ? (
              <NotificationCenter 
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
              />
            ) : (
              <UserRegistration 
                onRegister={handleRegister}
                isRegistered={!!userPhoneNumber}
              />
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            <TransactionList 
              transactions={transactions}
              anomalyDetector={anomalyDetector}
              userPhoneNumber={userPhoneNumber}
            />
          </div>
          <div className="space-y-6">
            <TransactionSimulator 
              onNewTransaction={handleNewTransaction}
            />
            <UserRegistration 
              onRegister={handleRegister}
              isRegistered={!!userPhoneNumber}
            />
            <FraudPreventionTips />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
