
import { Transaction } from './data-generator';

// Simple spam message detection model
export class SpamDetector {
  private knownSpamPatterns: RegExp[] = [
    /urgent.*money/i,
    /prize.*won/i,
    /bank.*suspend/i,
    /verify.*account/i,
    /click.*link/i,
    /limited time offer/i,
    /upi.*refund/i,
    /payment.*failed.*retry/i,
    /credit.*limit/i,
    /send money/i,
    /lottery/i,
    /your account.*blocked/i
  ];

  // Spam message features weights
  private featureWeights = {
    containsSpamPattern: 0.4,
    containsUrgentWords: 0.2,
    containsMoneyWords: 0.2,
    containsLinks: 0.1,
    unusualSender: 0.1
  };

  private trustedSenders: Set<string> = new Set();

  constructor(initialTrustedSenders: string[] = []) {
    initialTrustedSenders.forEach(sender => this.trustedSenders.add(sender));
  }

  // Add a trusted sender
  public addTrustedSender(sender: string): void {
    this.trustedSenders.add(sender);
  }

  // Check if a message is spam
  public isSpam(
    message: string, 
    sender: string
  ): { isSpam: boolean; score: number; reason: string } {
    // If sender is trusted, message is not spam
    if (this.trustedSenders.has(sender)) {
      return { isSpam: false, score: 0, reason: 'Trusted sender' };
    }

    let score = 0;
    let reason = '';
    
    // Check for spam patterns
    const hasSpamPattern = this.knownSpamPatterns.some(pattern => pattern.test(message));
    if (hasSpamPattern) {
      score += this.featureWeights.containsSpamPattern;
      reason = 'Contains suspicious phrases';
    }
    
    // Check for urgent words
    const urgentWords = /urgent|immediate|now|hurry|quick|fast|alert|warning/i;
    if (urgentWords.test(message)) {
      score += this.featureWeights.containsUrgentWords;
      reason = reason || 'Uses urgent language';
    }
    
    // Check for money related words
    const moneyWords = /money|cash|bank|credit|debit|account|fund|transfer|send|receive|pay|payment|upi|wallet/i;
    if (moneyWords.test(message)) {
      score += this.featureWeights.containsMoneyWords;
      reason = reason || 'Contains financial terms';
    }
    
    // Check for links
    const containsLinks = /https?:\/\/|www\.|bit\.ly|tinyurl|goo\.gl/i;
    if (containsLinks.test(message)) {
      score += this.featureWeights.containsLinks;
      reason = reason || 'Contains suspicious links';
    }
    
    // Check if sender is unusual
    const isSenderUnusual = !this.isCommonSender(sender);
    if (isSenderUnusual) {
      score += this.featureWeights.unusualSender;
      reason = reason || 'Unusual sender';
    }
    
    // Classify as spam if score is above threshold
    const threshold = 0.5;
    return {
      isSpam: score >= threshold,
      score,
      reason: score >= threshold ? reason : 'Message appears legitimate'
    };
  }

  // Check if a transaction might be related to a spam message
  public isTransactionSuspicious(
    transaction: Transaction, 
    recentSpamMessages: { sender: string; message: string }[]
  ): boolean {
    // If no recent spam messages, transaction is not suspicious
    if (recentSpamMessages.length === 0) return false;
    
    // Check if transaction receiver matches any recent spam message sender
    const matchingSenders = recentSpamMessages.some(
      spam => transaction.receiver.toLowerCase().includes(spam.sender.toLowerCase()) ||
              spam.sender.toLowerCase().includes(transaction.receiver.toLowerCase())
    );
    
    if (matchingSenders) return true;
    
    // Check if transaction amount is mentioned in any recent spam message
    const amountStr = transaction.amount.toString();
    const matchingAmounts = recentSpamMessages.some(
      spam => spam.message.includes(amountStr)
    );
    
    return matchingAmounts;
  }

  private isCommonSender(sender: string): boolean {
    // Common legitimate senders (banks, services, etc.)
    const commonSenders = [
      'hdfc', 'sbi', 'icici', 'axis', 'kotak', 'paytm', 'phonepe', 'gpay', 'googlepay',
      'amazon', 'flipkart', 'swiggy', 'zomato', 'ola', 'uber'
    ];
    
    return commonSenders.some(common => 
      sender.toLowerCase().includes(common) || common.includes(sender.toLowerCase())
    );
  }
}

// Helper for generating randomized spam messages for simulation
export const generateRandomSpamMessage = (): { sender: string; message: string } => {
  const spamTemplates = [
    {
      sender: "Prize-Alert",
      message: "Congratulations! You've won ₹10,000 in our UPI Lottery. Click here to claim: bit.ly/claim-now"
    },
    {
      sender: "Bank-Verify",
      message: "URGENT: Your UPI account will be suspended. Verify now by sending ₹1 to verify-upi@ybl"
    },
    {
      sender: "Refund-Service",
      message: "Your payment of ₹1,499 failed. Retry payment now or get refund: tinyurl.com/refund-upi"
    },
    {
      sender: "KYC-Update",
      message: "Your UPI KYC verification expired. Send ₹10 to kyc-verify@upi to continue services."
    },
    {
      sender: "Account-Alert",
      message: "WARNING: Suspicious login detected on your UPI account. Verify identity: goo.gl/secure-upi"
    }
  ];
  
  return spamTemplates[Math.floor(Math.random() * spamTemplates.length)];
};
