import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { ValidationCategory } from '@/types';

interface ValidationPanelProps {
  validations: ValidationCategory[];
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({ validations }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4">
    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <CheckCircle className="w-5 h-5 text-green-600" />
      Clinical Validation Results
    </h3>
    <div className="space-y-4">
      {validations.map((category, idx) => (
        <div key={idx}>
          <div className="font-medium text-gray-700 mb-2 text-sm">{category.category}</div>
          <div className="space-y-1">
            {category.checks.map((check, checkIdx) => (
              <div key={checkIdx} className="flex items-center justify-between text-sm py-1">
                <div className="flex items-center gap-2">
                  {check.status === 'pass' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {check.status === 'fail' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                  {check.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  <span className="text-gray-700">{check.name}</span>
                  {check.detail && <span className="text-xs text-gray-500">({check.detail})</span>}
                </div>
                <span className="text-xs text-gray-500">{check.duration}ms</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);