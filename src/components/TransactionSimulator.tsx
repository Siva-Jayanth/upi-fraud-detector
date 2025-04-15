
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateRandomTransaction, Transaction } from '@/utils/data-generator';

interface TransactionSimulatorProps {
  onNewTransaction: (transaction: Transaction) => void;
}

const TransactionSimulator: React.FC<TransactionSimulatorProps> = ({ onNewTransaction }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSpeed, setGenerationSpeed] = useState<'slow' | 'medium' | 'fast'>('medium');
  
  const getSpeedDelay = (): number => {
    switch (generationSpeed) {
      case 'slow': return 3000;
      case 'medium': return 1500;
      case 'fast': return 500;
      default: return 1500;
    }
  };
  
  const startGeneration = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    generateTransaction();
  };
  
  const stopGeneration = () => {
    setIsGenerating(false);
  };
  
  const generateTransaction = () => {
    if (!isGenerating) return;
    
    const newTransaction = generateRandomTransaction();
    onNewTransaction(newTransaction);
    
    setTimeout(generateTransaction, getSpeedDelay());
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Transaction Simulator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Generation Speed:</p>
            <div className="flex space-x-2">
              <Button 
                variant={generationSpeed === 'slow' ? 'default' : 'outline'}
                onClick={() => setGenerationSpeed('slow')}
                className="flex-1"
              >
                Slow
              </Button>
              <Button 
                variant={generationSpeed === 'medium' ? 'default' : 'outline'}
                onClick={() => setGenerationSpeed('medium')}
                className="flex-1"
              >
                Medium
              </Button>
              <Button 
                variant={generationSpeed === 'fast' ? 'default' : 'outline'}
                onClick={() => setGenerationSpeed('fast')}
                className="flex-1"
              >
                Fast
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => {
            const newTransaction = generateRandomTransaction();
            onNewTransaction(newTransaction);
          }}
          disabled={isGenerating}
        >
          Generate Single Transaction
        </Button>
        
        {isGenerating ? (
          <Button variant="destructive" onClick={stopGeneration}>
            Stop Auto Generation
          </Button>
        ) : (
          <Button variant="outline" onClick={startGeneration}>
            Start Auto Generation
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TransactionSimulator;
