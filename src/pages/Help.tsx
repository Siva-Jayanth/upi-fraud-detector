
import React from 'react';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Help = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Customer Support</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              For general inquiries, feature requests, or reporting issues:
            </p>
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-between">
              <span className="font-medium">qiscetcsbs@gmail.com</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('qiscetcsbs@gmail.com');
                  alert('Email copied to clipboard!');
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Copy
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              We typically respond within 24-48 hours.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">How does UPI Fraud Detection work?</h3>
              <p className="text-sm text-muted-foreground">
                Our system uses machine learning to analyze transaction patterns and identify suspicious activities that differ from your normal usage.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Is my phone number stored securely?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, all personal data is encrypted and stored in compliance with data protection regulations.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">How do I report a suspicious transaction?</h3>
              <p className="text-sm text-muted-foreground">
                You can flag any transaction in your dashboard by clicking on the transaction and selecting "Report as Suspicious".
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Phone Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              For urgent matters that require immediate assistance:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="font-medium">Technical Support</div>
                <div className="text-muted-foreground">+91 1800-XXX-XXXX</div>
                <div className="text-sm text-muted-foreground mt-1">Available 9AM-6PM IST, Mon-Fri</div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="font-medium">Fraud Report Hotline</div>
                <div className="text-muted-foreground">+91 1800-XXX-XXXX</div>
                <div className="text-sm text-muted-foreground mt-1">Available 24/7</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
