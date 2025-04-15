
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/utils/data-generator';
import { AnomalyDetector } from '@/utils/anomaly-detection';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AnomalyChartProps {
  transactions: Transaction[];
  anomalyDetector: AnomalyDetector;
}

const AnomalyChart: React.FC<AnomalyChartProps> = ({ transactions, anomalyDetector }) => {
  const prepareChartData = () => {
    // Sort by timestamp
    const sortedTransactions = [...transactions].sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    );
    
    return sortedTransactions.map(transaction => {
      const { score } = anomalyDetector.classifyTransaction(transaction);
      return {
        time: transaction.timestamp.toLocaleTimeString(),
        score: parseFloat((score * 100).toFixed(2)),
        amount: transaction.amount,
        id: transaction.id
      };
    });
  };

  const chartData = prepareChartData();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Anomaly Detection Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" orientation="left" label={{ value: 'Risk Score (%)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 'dataMax + 1000']} hide />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'score') return [`${value}%`, 'Risk Score'];
                  return [value, name];
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="score"
                stroke="#ef4444"
                fill="url(#colorScore)"
                activeDot={{ r: 8 }}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                fill="url(#colorAmount)"
                opacity={0.5}
              />
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="flex items-center justify-center p-2 bg-fraud-low/20 rounded">
            <span className="text-sm">Low Risk: &lt;50%</span>
          </div>
          <div className="flex items-center justify-center p-2 bg-fraud-medium/20 rounded">
            <span className="text-sm">Medium Risk: 50-70%</span>
          </div>
          <div className="flex items-center justify-center p-2 bg-fraud-high/20 rounded">
            <span className="text-sm">High Risk: &gt;70%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyChart;
