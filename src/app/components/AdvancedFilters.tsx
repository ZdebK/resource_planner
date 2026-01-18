import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

import { Resource } from './ResourceCard';
import { getResourceIcon, ResourceType } from '../Type';

export interface AdvancedFilter {
  id: string;
  type: ResourceType;
  resourceId: string;
  logic: 'AND' | 'OR';
}

interface AdvancedFiltersProps {
  resources: Resource[];
  filters: AdvancedFilter[];
  onFiltersChange: (filters: AdvancedFilter[]) => void;
  currentResourceType: string;
}

export function AdvancedFilters({ resources, filters, onFiltersChange, currentResourceType, isExpanded, setIsExpanded }: AdvancedFiltersProps & { isExpanded: boolean, setIsExpanded: (v: boolean) => void }) {
  // Ustal wspólną logikę dla wszystkich filtrów (jeśli są, bierz z pierwszego)
  const globalLogic = filters[0]?.logic || 'AND';
  // Funkcja do przełączania logiki wszystkich filtrów naraz
  const toggleGlobalLogic = () => {
    if (filters.length < 2) return;
    const newLogic = globalLogic === 'AND' ? 'OR' : 'AND';
    onFiltersChange(filters.map(f => ({ ...f, logic: newLogic })));
  };

  // Funkcja do zamiany pierwszej litery na wielką
  function toUpperFirstCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const getFilterableResources = (type: ResourceType) => {
    return resources.filter(r => r.type === type);
  };

  const addFilter = (type: ResourceType, resourceId: string) => {
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

  const getAvailableFilterTypes = (): ResourceType[] => {
    switch (currentResourceType) {
      case 'all':
        return [ResourceType.Machines, ResourceType.Devices, ResourceType.Employees];
      case ResourceType.Machines:
        return [ResourceType.Devices, ResourceType.Employees];
      case ResourceType.Devices:
        return [ResourceType.Machines, ResourceType.Employees];
      case ResourceType.Employees:
        return [ResourceType.Machines, ResourceType.Devices];
      default:
        return [];
    }
  };

  const availableTypes = getAvailableFilterTypes();

  return (
    <div className="bg-white border border-border rounded-lg shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
        aria-expanded={isExpanded}
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
                  {index === 1 && (
                    <div className="flex items-center gap-2 my-2">
                      <div className="flex-1 h-px bg-border" />
                      <button
                        onClick={toggleGlobalLogic}
                        className="px-3 py-1 bg-[var(--navy)] text-white text-xs rounded-full hover:bg-[var(--navy-light)] transition-colors"
                        data-testid="logic-toggle"
                        disabled={filters.length < 2}
                      >
                        {globalLogic}
                      </button>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-[var(--mint-subtle)] border border-[var(--mint)] p-2 rounded-lg">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="text-[var(--mint-dark)]">{getResourceIcon(filter.type)}</div>
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
                    <div className="text-[var(--navy)]">{getResourceIcon(type)}</div>
                    <label className="text-sm text-[var(--navy)]" htmlFor={`advanced-filter-select-${type}`}>
                      {toUpperFirstCase(type)}
                    </label>
                  </div>
                  <select
                    id={`advanced-filter-select-${type}`}
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
