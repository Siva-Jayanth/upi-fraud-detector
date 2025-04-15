
// Data generator for mock UPI transactions
export type Transaction = {
  id: string;
  amount: number;
  timestamp: Date;
  sender: string;
  receiver: string;
  location: string;
  device: string;
  transactionType: 'p2p' | 'merchant' | 'bill' | 'recharge';
  status: 'completed' | 'pending' | 'failed';
  features: {
    timeSinceLastTransaction: number;
    amountDeviation: number;
    unusualLocation: boolean;
    unusualDevice: boolean;
    unusualHour: boolean;
    firstTimeReceiver: boolean;
  };
};

// Typical transaction patterns for common users
const userPatterns: Record<string, {
  typicalAmounts: number[];
  commonReceivers: string[];
  commonLocations: string[];
  commonDevices: string[];
  typicalHours: number[];
}> = {
  'user1@upi': {
    typicalAmounts: [100, 200, 500, 1000],
    commonReceivers: ['merchant1@upi', 'friend1@upi', 'bill1@upi'],
    commonLocations: ['Mumbai', 'Delhi'],
    commonDevices: ['iPhone 12', 'MacBook Pro'],
    typicalHours: [8, 9, 12, 13, 18, 19, 20]
  },
  'user2@upi': {
    typicalAmounts: [50, 150, 300, 800],
    commonReceivers: ['merchant2@upi', 'friend2@upi', 'bill2@upi'],
    commonLocations: ['Bangalore', 'Hyderabad'],
    commonDevices: ['Samsung S21', 'Windows PC'],
    typicalHours: [7, 8, 13, 14, 19, 20, 21]
  },
  'user3@upi': {
    typicalAmounts: [200, 400, 600, 1200],
    commonReceivers: ['merchant3@upi', 'friend3@upi', 'bill3@upi'],
    commonLocations: ['Chennai', 'Kolkata'],
    commonDevices: ['Xiaomi Mi 11', 'Lenovo Laptop'],
    typicalHours: [9, 10, 12, 13, 17, 18, 19]
  }
};

// Possible locations, devices, and other parameters
const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Ahmedabad', 'Lucknow'];
const devices = ['iPhone 12', 'iPhone 13', 'Samsung S21', 'Samsung S22', 'Xiaomi Mi 11', 'OnePlus 9', 'MacBook Pro', 'Windows PC', 'Lenovo Laptop', 'Dell XPS'];
const transactionTypes: ('p2p' | 'merchant' | 'bill' | 'recharge')[] = ['p2p', 'merchant', 'bill', 'recharge'];
const users = Object.keys(userPatterns);
const merchants = ['merchant1@upi', 'merchant2@upi', 'merchant3@upi', 'merchant4@upi', 'merchant5@upi'];
const randomReceivers = ['unknown1@upi', 'unknown2@upi', 'unknown3@upi', 'unknown4@upi', 'unknown5@upi'];

// Generate a random transaction
export function generateRandomTransaction(): Transaction {
  const sender = users[Math.floor(Math.random() * users.length)];
  const userPattern = userPatterns[sender];
  
  // Decide if this will be a typical or anomalous transaction (20% chance of anomaly)
  const isAnomalous = Math.random() < 0.2;
  
  let amount: number;
  let receiver: string;
  let location: string;
  let device: string;
  let hour: number;
  
  if (isAnomalous) {
    // Generate anomalous transaction
    amount = Math.random() < 0.7 
      ? Math.floor(Math.random() * 10000) + 2000 // Unusual high amount
      : userPattern.typicalAmounts[Math.floor(Math.random() * userPattern.typicalAmounts.length)];
      
    receiver = Math.random() < 0.7
      ? randomReceivers[Math.floor(Math.random() * randomReceivers.length)] // Unusual receiver
      : userPattern.commonReceivers[Math.floor(Math.random() * userPattern.commonReceivers.length)];
      
    location = Math.random() < 0.5
      ? locations.filter(loc => !userPattern.commonLocations.includes(loc))[Math.floor(Math.random() * (locations.length - userPattern.commonLocations.length))]
      : userPattern.commonLocations[Math.floor(Math.random() * userPattern.commonLocations.length)];
      
    device = Math.random() < 0.5
      ? devices.filter(dev => !userPattern.commonDevices.includes(dev))[Math.floor(Math.random() * (devices.length - userPattern.commonDevices.length))]
      : userPattern.commonDevices[Math.floor(Math.random() * userPattern.commonDevices.length)];
      
    hour = Math.random() < 0.5
      ? Array.from({length: 24}, (_, i) => i).filter(h => !userPattern.typicalHours.includes(h))[Math.floor(Math.random() * (24 - userPattern.typicalHours.length))]
      : userPattern.typicalHours[Math.floor(Math.random() * userPattern.typicalHours.length)];
  } else {
    // Generate typical transaction
    amount = userPattern.typicalAmounts[Math.floor(Math.random() * userPattern.typicalAmounts.length)];
    receiver = userPattern.commonReceivers[Math.floor(Math.random() * userPattern.commonReceivers.length)];
    location = userPattern.commonLocations[Math.floor(Math.random() * userPattern.commonLocations.length)];
    device = userPattern.commonDevices[Math.floor(Math.random() * userPattern.commonDevices.length)];
    hour = userPattern.typicalHours[Math.floor(Math.random() * userPattern.typicalHours.length)];
  }
  
  const now = new Date();
  now.setHours(hour);
  
  const tranType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
  
  // Calculate some features for anomaly detection
  const timeSinceLastTransaction = Math.floor(Math.random() * 300) + 1; // In minutes
  const amountDeviation = Math.abs(amount - userPattern.typicalAmounts.reduce((a, b) => a + b, 0) / userPattern.typicalAmounts.length) / 
    (userPattern.typicalAmounts.reduce((a, b) => a + b, 0) / userPattern.typicalAmounts.length);
  const unusualLocation = !userPattern.commonLocations.includes(location);
  const unusualDevice = !userPattern.commonDevices.includes(device);
  const unusualHour = !userPattern.typicalHours.includes(hour);
  const firstTimeReceiver = !userPattern.commonReceivers.includes(receiver) && !merchants.includes(receiver);
  
  return {
    id: Math.random().toString(36).substring(2, 15),
    amount,
    timestamp: now,
    sender,
    receiver,
    location,
    device,
    transactionType: tranType,
    status: Math.random() < 0.95 ? 'completed' : (Math.random() < 0.5 ? 'pending' : 'failed'),
    features: {
      timeSinceLastTransaction,
      amountDeviation,
      unusualLocation,
      unusualDevice,
      unusualHour,
      firstTimeReceiver
    }
  };
}

// Generate a set of transactions
export function generateTransactionBatch(count: number): Transaction[] {
  return Array.from({ length: count }, () => generateRandomTransaction());
}

// Initial dataset
export const initialTransactions = generateTransactionBatch(50);
