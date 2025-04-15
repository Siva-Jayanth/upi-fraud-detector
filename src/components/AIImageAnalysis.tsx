
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, Camera, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIImageAnalysisProps {
  isLoggedIn: boolean;
}

const AIImageAnalysis: React.FC<AIImageAnalysisProps> = ({ isLoggedIn }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    isFraudulent: boolean;
    confidence: number;
    explanation: string;
  } | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setSelectedImage(e.target.result);
          setAnalysisResult(null);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const analyzeImage = () => {
    if (!selectedImage) return;
    
    setAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // Random result for demonstration
      const isFraudulent = Math.random() > 0.7;
      const confidence = 0.65 + Math.random() * 0.3;
      
      setAnalysisResult({
        isFraudulent,
        confidence,
        explanation: isFraudulent
          ? "This QR code appears to be modified and could be linked to fraudulent activities. The format deviates from standard UPI QR patterns and contains suspicious elements."
          : "This QR code appears to be legitimate and follows standard UPI security patterns. No suspicious elements detected."
      });
      
      toast({
        title: isFraudulent ? "Potential Fraud Detected" : "Image Appears Legitimate",
        description: isFraudulent 
          ? "The analyzed QR code may be fraudulent" 
          : "The analyzed QR code appears to be legitimate",
        variant: isFraudulent ? "destructive" : "default",
      });
      
      setAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  if (!isLoggedIn) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            AI Image Detection
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Sign in to use the AI QR code and image fraud detection
          </p>
          <Button disabled className="w-full">
            Upload Image
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          AI Image Detection
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedImage ? (
          <div className="text-center py-6">
            <div className="mb-4 border-2 border-dashed border-gray-300 rounded-lg p-10 cursor-pointer hover:bg-gray-50 transition-colors duration-300">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">
                Upload a QR code or suspicious image to analyze
              </p>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="image-upload">
                <Button asChild>
                  <span>Select Image</span>
                </Button>
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              The AI will scan for signs of fraud or tampering in UPI QR codes and payment screenshots
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Selected for analysis" 
                className="w-full h-auto rounded-lg object-contain max-h-48 mx-auto"
              />
              <Button 
                size="icon" 
                variant="destructive" 
                className="absolute top-2 right-2 h-6 w-6 rounded-full"
                onClick={resetAnalysis}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            {analysisResult ? (
              <div className={`p-4 rounded-lg ${
                analysisResult.isFraudulent 
                  ? 'bg-red-50 border border-red-200' 
                  : 'bg-green-50 border border-green-200'
              }`}>
                <div className="flex items-start gap-3">
                  {analysisResult.isFraudulent ? (
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                  )}
                  <div>
                    <h3 className={`font-medium ${
                      analysisResult.isFraudulent ? 'text-red-700' : 'text-green-700'
                    }`}>
                      {analysisResult.isFraudulent ? 'Potentially Fraudulent' : 'Appears Legitimate'}
                      {' '}
                      <span className="font-normal text-sm">
                        ({Math.round(analysisResult.confidence * 100)}% confidence)
                      </span>
                    </h3>
                    <p className={`text-sm mt-1 ${
                      analysisResult.isFraudulent ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {analysisResult.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Button 
                className="w-full"
                disabled={analyzing}
                onClick={analyzeImage}
              >
                {analyzing ? "Analyzing..." : "Analyze Image"}
              </Button>
            )}
            
            {analysisResult && analysisResult.isFraudulent && (
              <div className="text-sm text-muted-foreground pt-2">
                <h4 className="font-medium">What to do now?</h4>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Do not scan this QR code or make payments</li>
                  <li>Report to your bank or UPI provider</li>
                  <li>Block the sender if received in a message</li>
                </ul>
              </div>
            )}
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={resetAnalysis}
            >
              Upload Another Image
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIImageAnalysis;
