
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUp, ArrowDown, CheckCircle, AlertCircle, Filter, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnomalyDetector } from '@/utils/anomaly-detection';
import { generateTransactionBatch } from '@/utils/data-generator';

// Generate some test transactions
const transactionData = generateTransactionBatch(30);
const anomalyDetector = new AnomalyDetector();

const UpiAppLogos: Record<string, string> = {
  'PhonePe': 'https://play-lh.googleusercontent.com/6iyA2zVz5PyyMjK5SIxdUhrb7oh9cYVXI93X9brOZ07XrKJg2xQM_vGwPEFY58wUAvRZ',
  'Google Pay': 'https://play-lh.googleusercontent.com/HArtbyi53u0jnqhnnxkQnMx9dHOtFeNsy8lmXeyKg-fbY9DAK5gdOfiPcXpqAIMIDg',
  'Paytm': 'https://play-lh.googleusercontent.com/8JYAAeKzIMa85n2-VfUNcRXUcEO7OucKGKp7oJ9-yMInGOLPvvI_QUJSy8xNGCJYz4k',
  'BHIM': 'https://play-lh.googleusercontent.com/B5cNBA15IxjCT-8UTXEWgiPcGkJ1T_1RzC3xIsAiam4h4NLqLAiKyq6KN1GDuH0kr6M',
  'Amazon Pay': 'https://play-lh.googleusercontent.com/5KxPYQzKMiY4t5yX-cb_5KLUZw75eVLxDnhmvQ_LeYDZDLfQQiULNRTXzZoRD6Wf-BNi',
  'Mobile Banking': '',
  'ATM': '',
};

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [currentPeriod, setCurrentPeriod] = useState('month');
  
  // Filter transactions based on search term and filters
  const filteredTransactions = transactionData.filter(transaction => {
    const matchesSearch = 
      transaction.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm);
      
    const { risk } = anomalyDetector.classifyTransaction(transaction);
    
    const matchesType = filterType === 'all' || 
      (filterType === 'sent' && transaction.type === 'outgoing') ||
      (filterType === 'received' && transaction.type === 'incoming');
      
    const matchesRisk = filterRisk === 'all' || 
      (filterRisk === 'high' && (risk === 'high' || risk === 'critical')) ||
      (filterRisk === 'medium' && risk === 'medium') ||
      (filterRisk === 'low' && risk === 'low');
      
    return matchesSearch && matchesType && matchesRisk;
  });
  
  // Calculate transaction summary
  const summary = {
    total: transactionData.length,
    sent: transactionData.filter(t => t.type === 'outgoing').length,
    received: transactionData.filter(t => t.type === 'incoming').length,
    totalAmount: transactionData.reduce((sum, t) => sum + t.amount, 0),
    sentAmount: transactionData.filter(t => t.type === 'outgoing').reduce((sum, t) => sum + t.amount, 0),
    receivedAmount: transactionData.filter(t => t.type === 'incoming').reduce((sum, t) => sum + t.amount, 0),
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Transaction History</h1>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="month">
                <TabsList className="mb-4">
                  <TabsTrigger value="day" onClick={() => setCurrentPeriod('day')}>Today</TabsTrigger>
                  <TabsTrigger value="week" onClick={() => setCurrentPeriod('week')}>This Week</TabsTrigger>
                  <TabsTrigger value="month" onClick={() => setCurrentPeriod('month')}>This Month</TabsTrigger>
                  <TabsTrigger value="year" onClick={() => setCurrentPeriod('year')}>This Year</TabsTrigger>
                </TabsList>
                
                <TabsContent value="day" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Total Transactions</div>
                        <div className="text-2xl font-bold">{Math.floor(summary.total / 30)}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                        <div className="text-2xl font-bold">₹{Math.floor(summary.totalAmount / 30).toLocaleString()}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Suspicious Transactions</div>
                        <div className="text-2xl font-bold text-fraud-high">1</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="week" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Total Transactions</div>
                        <div className="text-2xl font-bold">{Math.floor(summary.total / 4)}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                        <div className="text-2xl font-bold">₹{Math.floor(summary.totalAmount / 4).toLocaleString()}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Suspicious Transactions</div>
                        <div className="text-2xl font-bold text-fraud-high">3</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="month" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Total Transactions</div>
                        <div className="text-2xl font-bold">{summary.total}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                        <div className="text-2xl font-bold">₹{summary.totalAmount.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Suspicious Transactions</div>
                        <div className="text-2xl font-bold text-fraud-high">12</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="year" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Total Transactions</div>
                        <div className="text-2xl font-bold">{summary.total * 12}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                        <div className="text-2xl font-bold">₹{(summary.totalAmount * 12).toLocaleString()}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Suspicious Transactions</div>
                        <div className="text-2xl font-bold text-fraud-high">47</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Transaction List</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      className="pl-8 w-full md:w-[260px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <select
                    className="border border-input bg-background px-3 py-2 text-sm rounded-md"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="sent">Sent</option>
                    <option value="received">Received</option>
                  </select>
                  
                  <select
                    className="border border-input bg-background px-3 py-2 text-sm rounded-md"
                    value={filterRisk}
                    onChange={(e) => setFilterRisk(e.target.value)}
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="high">High Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="low">Low Risk</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => {
                      const { risk, score } = anomalyDetector.classifyTransaction(transaction);
                      const isOutgoing = transaction.type === 'outgoing';
                      const appLogo = transaction.app ? UpiAppLogos[transaction.app] : '';
                      
                      return (
                        <div 
                          key={transaction.id} 
                          className={`p-4 rounded-lg border ${
                            risk === 'critical' ? 'border-fraud-critical bg-red-50' :
                            risk === 'high' ? 'border-fraud-high bg-red-50/50' :
                            risk === 'medium' ? 'border-fraud-medium bg-yellow-50/50' :
                            'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div className="flex items-center gap-3">
                              {appLogo ? (
                                <img 
                                  src={appLogo} 
                                  alt={transaction.app}
                                  className="w-10 h-10 rounded-md object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 font-medium">
                                  {transaction.app?.substring(0, 2) || 'UPI'}
                                </div>
                              )}
                              
                              <div>
                                <h3 className="font-medium flex items-center gap-2">
                                  {isOutgoing ? (
                                    <>To: <span className="text-gray-900">{transaction.receiver}</span></>
                                  ) : (
                                    <>From: <span className="text-gray-900">{transaction.sender}</span></>
                                  )}
                                  
                                  {risk === 'high' || risk === 'critical' ? (
                                    <AlertCircle className="h-4 w-4 text-fraud-high" />
                                  ) : (
                                    <CheckCircle className="h-4 w-4 text-fraud-low" />
                                  )}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {transaction.app || 'UPI'} • {transaction.timestamp.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end">
                              <div className={`font-medium flex items-center gap-1 ${isOutgoing ? 'text-red-600' : 'text-green-600'}`}>
                                {isOutgoing ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                                ₹{transaction.amount.toLocaleString()}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {transaction.app || 'UPI'}
                                </Badge>
                                
                                {(risk === 'high' || risk === 'critical') && (
                                  <Badge className="bg-fraud-high text-xs">
                                    Suspicious
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {(risk === 'high' || risk === 'critical') && (
                            <div className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
                              <p className="font-semibold flex items-center gap-1">
                                <AlertCircle className="h-4 w-4" />
                                Warning: This transaction appears suspicious
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No transactions found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Transaction Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img 
                      src={UpiAppLogos['PhonePe']} 
                      alt="PhonePe"
                      className="w-6 h-6 rounded-sm"
                    />
                    <span>PhonePe</span>
                  </div>
                  <span className="font-medium">42%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img 
                      src={UpiAppLogos['Google Pay']} 
                      alt="Google Pay"
                      className="w-6 h-6 rounded-sm"
                    />
                    <span>Google Pay</span>
                  </div>
                  <span className="font-medium">28%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img 
                      src={UpiAppLogos['Paytm']} 
                      alt="Paytm"
                      className="w-6 h-6 rounded-sm"
                    />
                    <span>Paytm</span>
                  </div>
                  <span className="font-medium">15%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-100 rounded-sm flex items-center justify-center text-gray-500 font-medium text-xs">
                      MB
                    </div>
                    <span>Mobile Banking</span>
                  </div>
                  <span className="font-medium">10%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-100 rounded-sm flex items-center justify-center text-gray-500 font-medium text-xs">
                      AT
                    </div>
                    <span>ATM</span>
                  </div>
                  <span className="font-medium">5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Low Risk</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-fraud-low h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Medium Risk</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-fraud-medium h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">High Risk</span>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-fraud-high h-2 rounded-full" style={{ width: "8%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Critical Risk</span>
                    <span className="text-sm font-medium">2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-fraud-critical h-2 rounded-full" style={{ width: "2%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>• Never share your UPI PIN with anyone</p>
                <p>• Verify recipient details before payment</p>
                <p>• Be cautious of unexpected payment requests</p>
                <p>• Turn on notifications for all transactions</p>
                <p>• Report suspicious activities immediately</p>
                <p>• Regularly check your transaction history</p>
                <p>• Use a screen lock on your phone</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
