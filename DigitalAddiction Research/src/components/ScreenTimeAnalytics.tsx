/**
 * Screen time analytics visualization component
 */

import React from 'react';
import { Smartphone, TrendingDown, Calendar, BarChart3 } from 'lucide-react';

interface ScreenTimeData {
  period: string;
  hours: number;
  change: number;
}

export default function ScreenTimeAnalytics() {
  // Sample data based on the actual screen time monitoring files
  const screenTimeData: ScreenTimeData[] = [
    { period: 'Baseline Week', hours: 6.35, change: 0 },
    { period: 'Week 1', hours: 5.8, change: -8.7 },
    { period: 'Week 2', hours: 7.65, change: +32.0 },
    { period: 'Current', hours: 7.39, change: -3.4 }
  ];

  const mostUsedApps = [
    { name: 'Instagram', hours: 4.5, color: 'bg-pink-500' },
    { name: 'Messages', hours: 2.8, color: 'bg-blue-500' },
    { name: 'Wells Fargo', hours: 2.1, color: 'bg-green-500' },
    { name: 'YouTube', hours: 1.9, color: 'bg-red-500' },
    { name: 'Cash App', hours: 1.2, color: 'bg-purple-500' }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Screen Time Analytics</h3>
      </div>
      
      {/* Weekly Trends */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Weekly Progress
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {screenTimeData.map((data, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-400 mb-1">{data.period}</div>
              <div className="text-xl font-bold text-white mb-1">{data.hours}h</div>
              {data.change !== 0 && (
                <div className={`text-xs flex items-center justify-center gap-1 ${
                  data.change > 0 ? 'text-red-400' : 'text-green-400'
                }`}>
                  <TrendingDown className={`w-3 h-3 ${data.change > 0 ? 'rotate-180' : ''}`} />
                  {Math.abs(data.change)}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Top Apps */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-400" />
          Most Used Apps
        </h4>
        <div className="space-y-3">
          {mostUsedApps.map((app, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${app.color}`}></div>
              <div className="flex-1 flex justify-between items-center">
                <span className="text-gray-300">{app.name}</span>
                <span className="text-white font-medium">{app.hours}h</span>
              </div>
              <div className="w-20 bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${app.color}`}
                  style={{ width: `${(app.hours / 4.5) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
