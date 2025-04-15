
import React, { useState, useEffect } from 'react';
import { Menu, Shield, Bell, User, LogIn, LogOut } from 'lucide-react';
import UserRegistration from '@/components/UserRegistration';
import NotificationCenter, { Notification } from '@/components/NotificationCenter';
import TransactionList from '@/components/TransactionList';
import DashboardStats from '@/components/DashboardStats';
import FraudPreventionTips from '@/components/FraudPreventionTips';
import AnomalyChart from '@/components/AnomalyChart';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import { generateTransactionBatch } from '@/utils/data-generator';
import { AnomalyDetector } from '@/utils/anomaly-detection';
import { SpamDetector } from '@/utils/spam-detection';
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import MenuBar from '@/components/layout/MenuBar';
import MainNavigation from '@/components/layout/MainNavigation';

const Dashboard = () => {
  const { toast } = useToast();
  
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState('');
  
  // Application state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [blockedSpamCount, setBlockedSpamCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Initialize ML models and data
  const anomalyDetector = new AnomalyDetector();
  const spamDetector = new SpamDetector();
  const transactions = generateTransactionBatch(20);

  // Handle user registration
  const handleRegister = (phone: string) => {
    if (phone) {
      setPhoneNumber(phone);
      setIsRegistered(true);
      generateInitialNotifications();
      toast({
        title: "Protection Activated",
        description: "Your phone is now protected against fraud and spam",
      });
    } else {
      setPhoneNumber('');
      setIsRegistered(false);
    }
  };

  // Auth functions
  const handleSignIn = (email: string, password: string) => {
    // In a real app, this would validate credentials with a backend
    setIsLoggedIn(true);
    setShowSignIn(false);
    setShowSignUp(false);
    setUsername(email.split('@')[0]);
    toast({
      title: "Sign In Successful",
      description: "Welcome back to UPI Fraud Detector",
    });
  };

  const handleSignUp = (name: string, email: string, password: string, phone: string) => {
    // In a real app, this would create a user in the database
    setIsLoggedIn(true);
    setShowSignIn(false);
    setShowSignUp(false);
    setUsername(name);
    // Also register their phone for protection
    handleRegister(phone);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  // Generate some initial notifications
  const generateInitialNotifications = () => {
    const newNotifications: Notification[] = [
      {
        id: uuidv4(),
        type: 'info',
        title: 'Welcome to UPI Fraud Detector',
        message: 'Your account is now protected against fraud and spam',
        timestamp: new Date(),
        isRead: false
      }
    ];
    
    // Add some sample notifications
    transactions.slice(0, 3).forEach(transaction => {
      const { risk } = anomalyDetector.classifyTransaction(transaction);
      if (risk === 'high' || risk === 'critical') {
        newNotifications.push({
          id: uuidv4(),
          type: 'fraud-alert',
          title: 'Suspicious Transaction Detected',
          message: `Transaction of ₹${transaction.amount} to ${transaction.receiver} looks suspicious`,
          timestamp: new Date(Date.now() - Math.random() * 3600000),
          isRead: false
        });
      }
    });
    
    // Add spam blocked notification
    newNotifications.push({
      id: uuidv4(),
      type: 'spam-blocked',
      title: 'Spam Messages Blocked',
      message: 'We blocked 3 spam messages in the last 24 hours',
      timestamp: new Date(Date.now() - 7200000),
      isRead: false
    });
    
    setNotifications(newNotifications);
    setBlockedSpamCount(3);
  };

  // Handle marking notifications as read
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Menu Bar with the circular 3-dot menu */}
      <MenuBar 
        isLoggedIn={isLoggedIn}
        onSignIn={() => setShowSignIn(true)}
        onSignUp={() => setShowSignUp(true)}
        onLogout={handleLogout}
        onViewNotifications={() => setShowNotifications(!showNotifications)}
        username={username}
      />
      
      {/* Auth forms */}
      {!isLoggedIn && showSignIn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md">
            <button 
              onClick={() => setShowSignIn(false)} 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10"
            >
              ✕
            </button>
            <SignInForm 
              onSignIn={handleSignIn} 
              onSwitchToSignUp={() => {
                setShowSignIn(false);
                setShowSignUp(true);
              }} 
            />
          </div>
        </div>
      )}
      
      {!isLoggedIn && showSignUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md">
            <button 
              onClick={() => setShowSignUp(false)} 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10"
            >
              ✕
            </button>
            <SignUpForm 
              onSignUp={handleSignUp} 
              onSwitchToSignIn={() => {
                setShowSignUp(false);
                setShowSignIn(true);
              }} 
            />
          </div>
        </div>
      )}
      
      {/* Notifications panel */}
      {showNotifications && (
        <div className="fixed top-16 right-4 w-80 z-40">
          <NotificationCenter 
            notifications={notifications} 
            onMarkAsRead={handleMarkAsRead} 
          />
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Navigation for smaller screens */}
        <div className="md:hidden mb-6">
          <MainNavigation isLoggedIn={isLoggedIn} />
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DashboardStats 
              transactions={transactions} 
              anomalyDetector={anomalyDetector} 
              blockedSpam={blockedSpamCount}
              isRegistered={isRegistered}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnomalyChart 
                transactions={transactions}
                anomalyDetector={anomalyDetector}
              />
              <div>
                {isLoggedIn ? (
                  isRegistered ? (
                    <UserRegistration 
                      onRegister={handleRegister} 
                      isRegistered={isRegistered} 
                    />
                  ) : (
                    <UserRegistration 
                      onRegister={handleRegister} 
                      isRegistered={isRegistered} 
                    />
                  )
                ) : (
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Welcome to UPI Fraud Detector</h2>
                    <p className="text-gray-600 mb-6">
                      Sign in or create an account to protect your UPI transactions and block spam messages.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md w-full transition-colors duration-300"
                        onClick={() => {
                          setShowSignUp(true);
                          setShowSignIn(false);
                        }}
                      >
                        Get Started
                      </button>
                      <button 
                        className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md w-full transition-colors duration-300"
                        onClick={() => {
                          setShowSignIn(true);
                          setShowSignUp(false);
                        }}
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                )}
                <FraudPreventionTips />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <TransactionList 
              transactions={transactions} 
              anomalyDetector={anomalyDetector}
              userPhoneNumber={isRegistered ? phoneNumber : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
