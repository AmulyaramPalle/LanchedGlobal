
import React, { useState, useMemo } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import ShowCard from '@/components/ShowCard';
import StatsCard from '@/components/StatsCard';
import { Filter } from 'lucide-react';

// Mock data for shows
const mockShows = [
  {
    id: '1',
    title: 'Breaking Bad',
    image: 'https://images.unsplash.com/photo-1489599508254-c1b7d92d8b70?w=400',
    currentEpisode: 45,
    totalEpisodes: 62,
    rating: 9.5,
    status: 'completed',
    genre: ['Drama', 'Crime'],
    year: 2008
  },
  {
    id: '2',
    title: 'Stranger Things',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
    currentEpisode: 24,
    totalEpisodes: 42,
    rating: 8.7,
    status: 'watching',
    genre: ['Sci-Fi', 'Horror'],
    year: 2016
  },
  {
    id: '3',
    title: 'The Crown',
    image: 'https://images.unsplash.com/photo-1523207911345-32501502db22?w=400',
    currentEpisode: 0,
    totalEpisodes: 60,
    rating: 8.6,
    status: 'plan-to-watch',
    genre: ['Drama', 'Biography'],
    year: 2016
  },
  {
    id: '4',
    title: 'Game of Thrones',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    currentEpisode: 55,
    totalEpisodes: 73,
    rating: 8.2,
    status: 'on-hold',
    genre: ['Fantasy', 'Drama'],
    year: 2011
  },
  {
    id: '5',
    title: 'The Office',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400',
    currentEpisode: 201,
    totalEpisodes: 201,
    rating: 9.0,
    status: 'completed',
    genre: ['Comedy'],
    year: 2005
  },
  {
    id: '6',
    title: 'Lost',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    currentEpisode: 30,
    totalEpisodes: 121,
    rating: 7.8,
    status: 'dropped',
    genre: ['Mystery', 'Drama'],
    year: 2004
  }
];

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [shows, setShows] = useState(mockShows);

  const filteredShows = useMemo(() => {
    let filtered = shows;
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(show => show.status === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(show => 
        show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        show.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  }, [shows, activeCategory, searchQuery]);

  const stats = useMemo(() => {
    const totalShows = shows.length;
    const totalEpisodes = shows.reduce((sum, show) => sum + show.currentEpisode, 0);
    const averageRating = shows.reduce((sum, show) => sum + show.rating, 0) / shows.length;
    const hoursWatched = totalEpisodes * 0.75; // Assuming 45 minutes per episode
    
    return { totalShows, totalEpisodes, averageRating, hoursWatched };
  }, [shows]);

  const handleUpdateProgress = (showId: string, newEpisode: number) => {
    setShows(prev => prev.map(show => 
      show.id === showId 
        ? { 
            ...show, 
            currentEpisode: Math.min(newEpisode, show.totalEpisodes),
            status: newEpisode >= show.totalEpisodes ? 'completed' : show.status
          }
        : show
    ));
  };

  const getCategoryTitle = (category: string) => {
    const titles = {
      'all': 'All Shows',
      'watching': 'Currently Watching',
      'completed': 'Completed Shows',
      'on-hold': 'On Hold',
      'dropped': 'Dropped',
      'plan-to-watch': 'Plan to Watch',
      'clubs': 'Club Discussions'
    };
    return titles[category as keyof typeof titles] || 'Shows';
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <TopBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
        
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {getCategoryTitle(activeCategory)}
              </h1>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <span className="text-sm text-gray-600">
                  {filteredShows.length} show{filteredShows.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            {activeCategory === 'all' && (
              <StatsCard {...stats} />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredShows.map((show) => (
                <ShowCard 
                  key={show.id} 
                  show={show} 
                  onUpdateProgress={handleUpdateProgress}
                />
              ))}
            </div>
            
            {filteredShows.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📺</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No shows found</h3>
                <p className="text-gray-500">
                  {searchQuery 
                    ? `No shows match your search for "${searchQuery}"`
                    : `No shows in ${getCategoryTitle(activeCategory).toLowerCase()}`
                  }
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
