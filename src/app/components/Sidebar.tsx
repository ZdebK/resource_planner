import { Filter, Search } from 'lucide-react';
import { resourceTypeMeta, ResourceTypeId } from '../Type';
import { ReactNode } from 'react';

interface SidebarProps {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  advancedFilters?: ReactNode;
}

export function Sidebar({ selectedTypes, onTypeToggle, searchQuery, onSearchChange, advancedFilters }: SidebarProps) {
  // Wspólna meta-informacja o typach zasobów + liczności
  const resourceTypes = [
    { ...resourceTypeMeta.all, count: 45 },
    { ...resourceTypeMeta.employee, count: 18 },
    { ...resourceTypeMeta.machines, count: 15 },
    { ...resourceTypeMeta.devices, count: 12 },
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
        <div className="space-y-2">
          <h3 className="text-sm text-muted-foreground mb-3">Resource Type</h3>
          {resourceTypes.map(type => {
            const isSelected = selectedTypes.includes(type.id);
            return (
              <button
                key={type.id}
                onClick={() => onTypeToggle(type.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-[var(--mint-subtle)] border border-[var(--mint)] text-[var(--navy)]'
                    : 'bg-muted hover:bg-accent border border-transparent'
                }`}
              >
                <span className="flex items-center gap-2">
                  {type.icon && (
                    <span className={`p-1 rounded ${type.bg} ${type.iconColor}`}>{type.icon}</span>
                  )}
                  <span className="text-sm">{type.label}</span>
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isSelected ? 'bg-[var(--mint)] text-white' : 'bg-white text-muted-foreground'
                }`}>
                  {type.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Advanced Filters Section */}
        {advancedFilters && (
          <div className="mt-6">
            {advancedFilters}
          </div>
        )}
      </div>
    </aside>
  );
}