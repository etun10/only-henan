import React from 'react';
import { Show } from '../types';
import { Star, Clock, MapPin } from 'lucide-react';

interface Props {
  shows: Show[];
}

const Card: React.FC<{ show: Show }> = ({ show }) => (
  <div className={`rounded-xl p-5 border transition-all hover:shadow-md ${show.mustSee ? 'bg-earth-50 border-earth-300' : 'bg-white border-earth-100'}`}>
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-bold text-lg text-earth-900 font-heading">{show.name}</h4>
      {show.mustSee && (
        <span className="bg-earth-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Star size={12} fill="currentColor" /> 必看
        </span>
      )}
    </div>
    <div className="flex items-center gap-4 text-xs text-earth-600 mb-3">
      <span className="flex items-center gap-1"><Clock size={12} /> {show.duration}</span>
      {show.location && <span className="flex items-center gap-1"><MapPin size={12} /> {show.location}</span>}
    </div>
    <p className="text-sm text-earth-700 leading-relaxed">{show.description}</p>
  </div>
);

export const ShowGallery: React.FC<Props> = ({ shows }) => {
  const majorShows = shows.filter(s => s.type === 'Major');
  const microShows = shows.filter(s => s.type === 'Micro');

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-heading font-bold text-earth-900 mb-4 pl-4 border-l-4 border-earth-600">三大主剧场</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {majorShows.map((show, idx) => <Card key={idx} show={show} />)}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-heading font-bold text-earth-900 mb-4 pl-4 border-l-4 border-earth-400">精彩微剧场</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {microShows.map((show, idx) => <Card key={idx} show={show} />)}
        </div>
      </div>
    </div>
  );
};