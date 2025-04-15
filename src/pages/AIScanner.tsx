
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, ImagePlus, ShieldAlert, Image as ImageIcon, QrCode } from 'lucide-react';
import AIImageAnalysis from '@/components/AIImageAnalysis';

const AIScanner = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo purposes, assuming user is logged in
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Camera className="h-8 w-8 text-gray-800" />
        <h1 className="text-3xl font-bold">AI Fraud Detection</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Image Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our artificial intelligence system analyzes images to detect potential fraud, focusing on:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <QrCode className="h-4 w-4 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">QR Code Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Analyzes QR codes to detect tampering and fraudulent modifications
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <ImageIcon className="h-4 w-4 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Image Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Verifies payment screenshots and images for signs of manipulation
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <ShieldAlert className="h-4 w-4 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phishing Detection</h3>
                    <p className="text-sm text-muted-foreground">
                      Identifies fake UI elements designed to steal credentials
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <ImagePlus className="h-4 w-4 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-medium">Deep Learning Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Uses neural networks trained on thousands of fraudulent samples
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-2">How to use this feature:</h3>
                <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Upload an image using the panel on the right</li>
                  <li>Wait a few seconds for the AI to analyze the image</li>
                  <li>Review the detailed analysis results</li>
                  <li>Follow the recommendations if fraud is detected</li>
                </ol>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common QR Fraud Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium">QR Code Tampering</h3>
                    <p className="text-muted-foreground">
                      Fraudsters modify legitimate QR codes to redirect payments to their accounts.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Fake Payment Screenshots</h3>
                    <p className="text-muted-foreground">
                      Scammers send edited payment confirmation screenshots to deceive sellers.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Phishing QR Codes</h3>
                    <p className="text-muted-foreground">
                      QR codes that link to fake banking sites designed to steal credentials.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium">Verify Before Scanning</h3>
                    <p className="text-muted-foreground">
                      Always check the source of a QR code before scanning it.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Check Payment Details</h3>
                    <p className="text-muted-foreground">
                      Verify the recipient name and account details before confirming payment.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Use Official Apps</h3>
                    <p className="text-muted-foreground">
                      Only scan QR codes with official UPI apps from trusted sources.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="space-y-8">
          <AIImageAnalysis isLoggedIn={isLoggedIn} />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recently Detected Frauds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-red-50 rounded-md">
                  <p className="text-sm font-medium text-red-700">
                    QR code linking to fake payment site
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Detected 2 hours ago
                  </p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-md">
                  <p className="text-sm font-medium text-red-700">
                    Manipulated payment screenshot
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Detected yesterday
                  </p>
                </div>
                
                <div className="p-3 bg-red-50 rounded-md">
                  <p className="text-sm font-medium text-red-700">
                    QR code with embedded malicious redirect
                  </p>
                  <p className="text-xs text-red-600 mt-1">
                    Detected 3 days ago
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIScanner;
