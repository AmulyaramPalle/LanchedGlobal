
import React from 'react';
import { TrendingUp, Clock, Star, Calendar } from 'lucide-react';

interface StatsCardProps {
  totalShows: number;
  totalEpisodes: number;
  averageRating: number;
  hoursWatched: number;
}

const StatsCard = ({ totalShows, totalEpisodes, averageRating, hoursWatched }: StatsCardProps) => {
  const stats = [
    { label: 'Total Shows', value: totalShows, icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Episodes Watched', value: totalEpisodes, icon: Calendar, color: 'text-blue-600' },
    { label: 'Hours Watched', value: Math.round(hoursWatched), icon: Clock, color: 'text-green-600' },
    { label: 'Avg Rating', value: averageRating.toFixed(1), icon: Star, color: 'text-yellow-600' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <Icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCard;
