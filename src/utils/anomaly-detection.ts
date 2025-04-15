import { Transaction } from './data-generator';

// KNN-based unsupervised anomaly detection
// This is a simplified implementation for demonstration purposes
export class AnomalyDetector {
  private featureWeights = {
    amountDeviation: 0.35,
    timeSinceLastTransaction: 0.15,
    unusualLocation: 0.15,
    unusualDevice: 0.15,
    unusualHour: 0.1,
    firstTimeReceiver: 0.1
  };

  private recentTransactions: Transaction[] = [];
  private thresholds = {
    low: 0.3,
    medium: 0.5,
    high: 0.7
  };

  constructor(initialTransactions: Transaction[] = []) {
    this.recentTransactions = initialTransactions;
  }

  // Add a new transaction to the model
  public addTransaction(transaction: Transaction): void {
    this.recentTransactions.push(transaction);
    
    // Keep only the most recent 100 transactions
    if (this.recentTransactions.length > 100) {
      this.recentTransactions.shift();
    }
  }

  // Calculate anomaly score for a transaction (0-1, where higher is more anomalous)
  public getAnomalyScore(transaction: Transaction): number {
    const { features } = transaction;
    
    // Weighted feature combination
    let score = 0;
    
    // Amount deviation (normalized)
    score += features.amountDeviation * this.featureWeights.amountDeviation;
    
    // Unusual time (inverse of time since last transaction, normalized)
    const timeFactor = Math.max(0, Math.min(1, 1 - (features.timeSinceLastTransaction / 300)));
    score += timeFactor * this.featureWeights.timeSinceLastTransaction;
    
    // Boolean features
    if (features.unusualLocation) score += this.featureWeights.unusualLocation;
    if (features.unusualDevice) score += this.featureWeights.unusualDevice;
    if (features.unusualHour) score += this.featureWeights.unusualHour;
    if (features.firstTimeReceiver) score += this.featureWeights.firstTimeReceiver;
    
    return Math.min(1, score);
  }

  // Classify the risk level of a transaction
  public classifyTransaction(transaction: Transaction): {
    score: number;
    risk: 'low' | 'medium' | 'high' | 'critical';
    isFraudulent: boolean;
    explanation: string[];
  } {
    const score = this.getAnomalyScore(transaction);
    let risk: 'low' | 'medium' | 'high' | 'critical';
    let isFraudulent = false;
    
    if (score < this.thresholds.low) {
      risk = 'low';
    } else if (score < this.thresholds.medium) {
      risk = 'medium';
    } else if (score < this.thresholds.high) {
      risk = 'high';
    } else {
      risk = 'critical';
      isFraudulent = true;
    }
    
    const explanation = this.generateExplanation(transaction, score);
    
    return { score, risk, isFraudulent, explanation };
  }

  // Generate human-readable explanation for the classification
  private generateExplanation(transaction: Transaction, score: number): string[] {
    const { features } = transaction;
    const explanation: string[] = [];
    
    if (features.amountDeviation > 1.5) {
      explanation.push(`Transaction amount (₹${transaction.amount}) is significantly different from user's typical amounts`);
    }
    
    if (features.unusualLocation) {
      explanation.push(`Transaction location "${transaction.location}" is unusual for this user`);
    }
    
    if (features.unusualDevice) {
      explanation.push(`Transaction was made from an unusual device: ${transaction.device}`);
    }
    
    if (features.unusualHour) {
      explanation.push(`Transaction time (${transaction.timestamp.getHours()}:${transaction.timestamp.getMinutes()}) is unusual for this user`);
    }
    
    if (features.firstTimeReceiver) {
      explanation.push(`First transaction to receiver: ${transaction.receiver}`);
    }
    
    if (features.timeSinceLastTransaction < 5) {
      explanation.push(`Very short time since last transaction (${features.timeSinceLastTransaction} minutes)`);
    }
    
    if (explanation.length === 0) {
      if (score < this.thresholds.low) {
        explanation.push('Transaction matches normal pattern for this user');
      } else {
        explanation.push('Multiple small anomalies detected in combination');
      }
    }
    
    return explanation;
  }

  // Get recent fraudulent transactions
  public getRecentFraudulentTransactions(): Transaction[] {
    return this.recentTransactions.filter(
      transaction => this.getAnomalyScore(transaction) >= this.thresholds.high
    );
  }
}
