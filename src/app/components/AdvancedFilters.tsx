import { useState } from 'react';
import { ChevronDown, ChevronUp, X, User, Cpu, Smartphone } from 'lucide-react';
import { Resource } from './ResourceCard';

export interface AdvancedFilter {
  id: string;
  type: 'machine' | 'device' | 'employee';
  resourceId: string;
  logic: 'AND' | 'OR';
}

interface AdvancedFiltersProps {
  resources: Resource[];
  filters: AdvancedFilter[];
  onFiltersChange: (filters: AdvancedFilter[]) => void;
  currentResourceType: string;
}

export function AdvancedFilters({ resources, filters, onFiltersChange, currentResourceType }: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getFilterableResources = (type: 'machine' | 'device' | 'employee') => {
    const typeMap = {
      machine: 'machines',
      device: 'devices',
      employee: 'employees'
    };
    return resources.filter(r => r.type === typeMap[type]);
  };

  const addFilter = (type: 'machine' | 'device' | 'employee', resourceId: string) => {
    const newFilter: AdvancedFilter = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      resourceId,
      logic: filters.length === 0 ? 'AND' : 'OR'
    };
    onFiltersChange([...filters, newFilter]);
  };

  const removeFilter = (id: string) => {
    onFiltersChange(filters.filter(f => f.id !== id));
  };

  const toggleLogic = (id: string) => {
    onFiltersChange(filters.map(f => 
      f.id === id ? { ...f, logic: f.logic === 'AND' ? 'OR' : 'AND' } : f
    ));
  };

  const getResourceName = (resourceId: string) => {
    const resource = resources.find(r => r.id === resourceId);
    return resource?.name || 'Unknown';
  };

  const getIcon = (type: 'machine' | 'device' | 'employee') => {
    switch (type) {
      case 'machine':
        return <Cpu className="w-4 h-4" />;
      case 'device':
        return <Smartphone className="w-4 h-4" />;
      case 'employee':
        return <User className="w-4 h-4" />;
    }
  };

  const getFilterLabel = () => {
    if (currentResourceType === 'all' || currentResourceType === 'machines') {
      return 'Filter machines by compatible devices/operators';
    } else if (currentResourceType === 'devices') {
      return 'Filter devices by compatible machines/operators';
    } else if (currentResourceType === 'employees') {
      return 'Filter people by machines/devices they can operate';
    }
    return 'Advanced filters';
  };

  const getAvailableFilterTypes = (): Array<'machine' | 'device' | 'employee'> => {
    if (currentResourceType === 'all') {
      return ['machine', 'device', 'employee'];
    } else if (currentResourceType === 'machines') {
      return ['device', 'employee'];
    } else if (currentResourceType === 'devices') {
      return ['machine', 'employee'];
    } else if (currentResourceType === 'employees') {
      return ['machine', 'device'];
    }
    return [];
  };

  const availableTypes = getAvailableFilterTypes();

  return (
    <div className="bg-white border border-border rounded-lg shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--navy)]">Advanced Filters</span>
          {filters.length > 0 && (
            <span className="bg-[var(--mint)] text-white text-xs px-2 py-0.5 rounded-full">
              {filters.length} active
            </span>
          )}
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isExpanded && (
        <div className="p-4 border-t border-border space-y-4">
          <p className="text-xs text-muted-foreground">{getFilterLabel()}</p>

          {/* Active Filters */}
          {filters.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs text-muted-foreground">Active Filters</h4>
              {filters.map((filter, index) => (
                <div key={filter.id}>
                  {index > 0 && (
                    <div className="flex items-center gap-2 my-2">
                      <div className="flex-1 h-px bg-border" />
                      <button
                        onClick={() => toggleLogic(filter.id)}
                        className="px-3 py-1 bg-[var(--navy)] text-white text-xs rounded-full hover:bg-[var(--navy-light)] transition-colors"
                      >
                        {filter.logic}
                      </button>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-[var(--mint-subtle)] border border-[var(--mint)] p-2 rounded-lg">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="text-[var(--mint-dark)]">{getIcon(filter.type)}</div>
                      <span className="text-sm text-[var(--navy)]">{getResourceName(filter.resourceId)}</span>
                      <span className="text-xs text-muted-foreground capitalize">({filter.type})</span>
                    </div>
                    <button
                      onClick={() => removeFilter(filter.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                    >
                      <X className="w-3 h-3 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add New Filters */}
          <div className="space-y-3">
            <h4 className="text-xs text-muted-foreground">Add Filter</h4>
            {availableTypes.map(type => {
              const filterableResources = getFilterableResources(type);
              if (filterableResources.length === 0) return null;

              return (
                <div key={type} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="text-[var(--navy)]">{getIcon(type)}</div>
                    <label className="text-sm text-[var(--navy)] capitalize">{type}s</label>
                  </div>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        addFilter(type, e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--mint)]"
                  >
                    <option value="">Select a {type}...</option>
                    {filterableResources.map(resource => (
                      <option key={resource.id} value={resource.id}>
                        {resource.name}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>

          {filters.length > 0 && (
            <button
              onClick={() => onFiltersChange([])}
              className="w-full py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
