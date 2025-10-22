import React from 'react';
import { Zap } from 'lucide-react';
import { AgentAction } from '@/types';

interface AgentActivityLogProps {
  actions: AgentAction[];
}

export const AgentActivityLog: React.FC<AgentActivityLogProps> = ({ actions }) => {
  const systemColors = {
    nifi: 'bg-blue-100 text-blue-800',
    kafka: 'bg-purple-100 text-purple-800',
    flink: 'bg-green-100 text-green-800',
    aidoc: 'bg-red-100 text-red-800',
    'cloudera-ai': 'bg-indigo-100 text-indigo-800'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-indigo-600" />
        Agentic AI Activity
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {actions.map((action, idx) => (
          <div key={idx} className="border-l-2 border-gray-300 pl-3 pb-3">
            <div className="flex items-center gap-2 mb-1">
              {action.system && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${systemColors[action.system]}`}>
                  {action.system.toUpperCase()}
                </span>
              )}
              <span className="text-xs text-gray-500">{action.duration}ms</span>
            </div>
            <div className="font-medium text-sm text-gray-900 mb-1">{action.step}</div>
            <div className="text-xs text-gray-600 italic mb-1">💭 {action.thinking}</div>
            <div className="text-xs text-gray-700">✓ {action.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
};