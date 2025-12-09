import React, { useState } from 'react';
import { DayPlan } from '../types';
import { Sun, Moon, Map, Theater } from 'lucide-react';

interface Props {
  days: DayPlan[];
}

export const ItineraryTimeline: React.FC<Props> = ({ days }) => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-earth-200 overflow-hidden">
      <div className="flex border-b border-earth-200">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => setActiveDay(index)}
            className={`flex-1 py-4 text-center font-heading font-bold transition-colors ${
              activeDay === index 
                ? 'bg-earth-100 text-earth-900 border-b-2 border-earth-600' 
                : 'text-earth-500 hover:bg-earth-50'
            }`}
          >
            Day {day.dayNumber}: {day.title}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-24 top-0 bottom-0 w-0.5 bg-earth-200" />

          <div className="space-y-8">
            {days[activeDay].events.map((event, idx) => (
              <div key={idx} className="relative flex flex-col md:flex-row gap-4 md:gap-10">
                
                {/* Time Badge */}
                <div className="flex-shrink-0 w-12 md:w-24 text-right">
                  <span className="inline-block bg-earth-100 text-earth-800 text-sm font-bold px-2 py-1 rounded">
                    {event.time}
                  </span>
                </div>

                {/* Dot */}
                <div className={`absolute left-6 md:left-24 w-3 h-3 rounded-full border-2 transform -translate-x-1.5 mt-1.5 z-10 ${
                  event.isShow ? 'bg-earth-600 border-earth-200' : 'bg-white border-earth-400'
                }`} />

                {/* Content */}
                <div className="pl-12 md:pl-0 flex-1">
                  <div className={`rounded-lg p-4 ${event.isShow ? 'bg-earth-50 border border-earth-200' : 'bg-white'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {event.isShow ? <Theater size={18} className="text-earth-700" /> : <Map size={18} className="text-earth-400" />}
                      <h4 className={`font-bold ${event.isShow ? 'text-earth-900' : 'text-earth-600'}`}>
                        {event.activity}
                      </h4>
                    </div>
                    <p className="text-earth-700 text-sm">{event.description}</p>
                    {event.showName && (
                      <div className="mt-2 inline-flex items-center text-xs font-semibold text-earth-600 bg-white px-2 py-1 rounded border border-earth-100">
                        剧目: {event.showName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center text-earth-400">
            <Moon size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};