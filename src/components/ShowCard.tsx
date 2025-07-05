
import React from 'react';
import { Star, Play, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Show {
  id: string;
  title: string;
  image: string;
  currentEpisode: number;
  totalEpisodes: number;
  rating: number;
  status: string;
  genre: string[];
  year: number;
}

interface ShowCardProps {
  show: Show;
  onUpdateProgress: (showId: string, episode: number) => void;
}

const ShowCard = ({ show, onUpdateProgress }: ShowCardProps) => {
  const progressPercentage = (show.currentEpisode / show.totalEpisodes) * 100;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'watching': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'on-hold': return 'bg-yellow-500';
      case 'dropped': return 'bg-red-500';
      case 'plan-to-watch': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img 
          src={show.image} 
          alt={show.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={cn("px-2 py-1 rounded-full text-xs font-medium text-white", getStatusColor(show.status))}>
            {show.status.replace('-', ' ')}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white bg-black/50 px-2 py-1 rounded">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{show.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{show.title}</h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{show.year}</span>
          <span>•</span>
          <span>{show.genre.join(', ')}</span>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{show.currentEpisode}/{show.totalEpisodes} episodes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onUpdateProgress(show.id, show.currentEpisode + 1)}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
              disabled={show.currentEpisode >= show.totalEpisodes}
            >
              <Play className="w-4 h-4" />
              Mark Watched
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
