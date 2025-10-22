import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, color, trend }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
    <div className="flex items-center justify-between mb-2">
      <span className="text-gray-600 text-sm font-medium">{label}</span>
      <div className={`${color} p-2 rounded-lg`}>{icon}</div>
    </div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    {trend && <div className="text-xs text-gray-500 mt-1">{trend}</div>}
  </div>
);