import { Bell, Settings, User, Grid3x3, Package, Sparkles } from 'lucide-react';

interface TopNavProps {
  currentView: 'resources' | 'sets' | 'auto-sets';
  onViewChange: (view: 'resources' | 'sets' | 'auto-sets') => void;
}

export function TopNav({ currentView, onViewChange }: TopNavProps) {
  return (
    <nav className="h-16 bg-[var(--navy)] text-white flex items-center justify-between px-6 border-b border-[var(--navy-light)] shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[var(--mint)] rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <h1 className="text-white text-xl">Resource Allocator</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewChange('resources')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentView === 'resources'
                ? 'bg-[var(--mint)] text-[var(--navy)]'
                : 'hover:bg-[var(--navy-light)] text-white/80'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
            <span className="text-sm">Resources</span>
          </button>
          <button
            onClick={() => onViewChange('auto-sets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentView === 'auto-sets'
                ? 'bg-[var(--mint)] text-[var(--navy)]'
                : 'hover:bg-[var(--navy-light)] text-white/80'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Compatible Sets</span>
          </button>
          <button
            onClick={() => onViewChange('sets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentView === 'sets'
                ? 'bg-[var(--mint)] text-[var(--navy)]'
                : 'hover:bg-[var(--navy-light)] text-white/80'
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="text-sm">Saved Sets</span>
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-[var(--navy-light)] rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-[var(--navy-light)] rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-2 p-2 hover:bg-[var(--navy-light)] rounded-lg transition-colors">
          <div className="w-8 h-8 bg-[var(--mint)] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-[var(--navy)]" />
          </div>
          <span className="text-sm">Admin User</span>
        </button>
      </div>
    </nav>
  );
}