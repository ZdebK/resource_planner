import { Filter, Search, User, Cpu, Smartphone, Grid3x3 } from 'lucide-react';
import { ReactNode } from 'react';

interface SidebarProps {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  advancedFilters?: ReactNode;
  shrinkResourceType?: boolean;
}

export function Sidebar({ selectedTypes, onTypeToggle, searchQuery, onSearchChange, advancedFilters, shrinkResourceType }: SidebarProps) {
  const resourceTypes = [
    { 
      id: 'all', 
      label: 'All Resources', 
      icon: <Grid3x3 className="w-4 h-4" />,
      bg: 'bg-muted',
      color: 'text-[var(--navy)]'
    },
    { 
      id: 'employees', 
      label: 'Employees', 
      icon: <User className="w-4 h-4" />,
      bg: 'bg-[var(--employee-bg)]',
      color: 'text-[var(--employee-color)]'
    },
    { 
      id: 'machines', 
      label: 'Machines', 
      icon: <Cpu className="w-4 h-4" />,
      bg: 'bg-[var(--machine-bg)]',
      color: 'text-[var(--machine-color)]'
    },
    { 
      id: 'devices', 
      label: 'Devices', 
      icon: <Smartphone className="w-4 h-4" />,
      bg: 'bg-[var(--device-bg)]',
      color: 'text-[var(--device-color)]'
    }
  ];

  return (
    <aside className="w-72 bg-white border-r border-border flex flex-col shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[var(--navy)]" />
          <h2 className="text-[var(--navy)]">Filters</h2>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--mint)] transition-shadow"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className={`space-y-2 transition-all duration-300 ${shrinkResourceType ? 'scale-95 opacity-60' : ''}`}>
          <h3 className="text-sm text-muted-foreground mb-3">Resource Type</h3>
          {resourceTypes.map(type => {
            const isSelected = selectedTypes.includes(type.id);
            // If shrinkResourceType is true, only show the selected type
            if (shrinkResourceType && !isSelected) return null;
            return (
              <button
                key={type.id}
                onClick={() => onTypeToggle(type.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-[var(--mint-subtle)] border border-[var(--mint)]'
                    : 'bg-muted hover:bg-accent border border-transparent'
                }`}
              >
                <div className={`p-1.5 rounded ${type.bg}`}>
                  <div className={type.color}>
                    {type.icon}
                  </div>
                </div>
                <span className={`text-sm flex-1 text-left ${isSelected ? 'text-[var(--navy)] font-medium' : 'text-[var(--navy)]'}`}>
                  {type.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Advanced Filters Section - Always Visible */}
        {advancedFilters && (
          <div className="mt-6">
            {advancedFilters}
          </div>
        )}
      </div>
    </aside>
  );
}
