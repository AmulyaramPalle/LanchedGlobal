
import React from 'react';
import { Home, Eye, CheckCircle, Pause, X, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const categories = [
  { id: 'all', label: 'All Shows', icon: Home },
  { id: 'watching', label: 'Watching', icon: Eye },
  { id: 'completed', label: 'Completed', icon: CheckCircle },
  { id: 'on-hold', label: 'On Hold', icon: Pause },
  { id: 'dropped', label: 'Dropped', icon: X },
  { id: 'plan-to-watch', label: 'Plan to Watch', icon: Calendar },
  { id: 'clubs', label: 'Clubs', icon: Users },
];

const Sidebar = ({ activeCategory, onCategoryChange, isCollapsed, onToggleCollapse }: SidebarProps) => {
  return (
    <div className={cn(
      "bg-gradient-to-b from-purple-900 to-blue-900 h-full transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <h1 className="text-white font-bold text-xl">ShowHub</h1>
          )}
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <li key={category.id}>
                <button
                  onClick={() => onCategoryChange(category.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-left",
                    activeCategory === category.id
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium">{category.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <div className={cn("transition-transform", isCollapsed ? "rotate-180" : "")}>
            ←
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
