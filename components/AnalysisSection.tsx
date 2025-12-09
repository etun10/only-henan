import React from 'react';
import { TripData } from '../types';
import { Quote, Sparkles } from 'lucide-react';

interface Props {
  data: TripData['analysis'];
}

export const AnalysisSection: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-earth-200 p-6 md:p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-earth-100 rounded-lg text-earth-800">
          <Sparkles size={24} />
        </div>
        <h2 className="text-2xl font-heading font-bold text-earth-900">为什么是“只有河南”？</h2>
      </div>
      
      <div className="space-y-6">
        <div className="relative pl-6 border-l-4 border-earth-400">
          <Quote className="absolute -left-3 -top-3 text-earth-300 bg-white p-1" size={24} />
          <p className="text-earth-800 leading-relaxed text-lg">
            {data.whyPopular}
          </p>
        </div>
        
        <div className="bg-earth-50 rounded-lg p-5">
          <h3 className="text-earth-900 font-bold mb-2 font-heading">文化内核</h3>
          <p className="text-earth-700">
            {data.culturalSignificance}
          </p>
        </div>
      </div>
    </div>
  );
};