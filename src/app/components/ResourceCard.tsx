import { useState } from 'react';
import { Plus, Check, ChevronDown} from 'lucide-react';
import { resourceTypeMeta, ResourceCardProps } from '../Type';
import { ResourceListPopover } from "./ResourceListPopover";


export function ResourceCard({ resource, isSelected, onSelect, allResources }: ResourceCardProps) {
    // Helper: pobierz kompatybilne maszyny/urządzenia jako obiekty
    const getCompatibleItems = (type: 'machines' | 'devices') => {
      const ids = type === 'machines' ? resource.compatibleMachineIds : resource.compatibleDeviceIds;
      if (!ids || ids.length === 0) return [];
      return allResources.filter(r => ids.includes(r.id) && r.type === type);
    };
  const [expandedSection, setExpandedSection] = useState<string | null>(null);


  // typeMeta przeniesione do resourceTypeMeta.tsx

  const getStatusColor = () => {
    switch (resource.status) {
      case 'available':
        return 'bg-[var(--mint-subtle)] text-[var(--mint-dark)] border-[var(--mint)]';
      case 'in-use':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'maintenance':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  // Uproszczone: tylko badge z liczbą kompatybilnych maszyn i urządzeń
  const getCompatibilityBadges = () => {
    const badges: Array<{ type: 'machines' | 'devices'; count: number }> = [];
    if (resource.compatibleMachineIds && resource.compatibleMachineIds.length > 0) {
      badges.push({ type: 'machines', count: resource.compatibleMachineIds.length });
    }
    if (resource.compatibleDeviceIds && resource.compatibleDeviceIds.length > 0) {
      badges.push({ type: 'devices', count: resource.compatibleDeviceIds.length });
    }
    return badges;
  };

  const getResourceName = (id: string) => {
    const res = allResources.find(r => r.id === id);
    return res?.name || 'Unknown';
  };

  const toggleSection = (key: string) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  const compatibilityBadges = getCompatibilityBadges();
  const costLabel = resource.type === 'employee' ? 'Hiring Cost' : 'Purchase Cost';

  return (
    <div
      className={`bg-white rounded-xl border-2 transition-all hover:shadow-md ${
        isSelected
          ? 'border-[var(--mint)] shadow-lg shadow-[var(--mint)]/10'
          : 'border-border hover:border-[var(--mint)]/30'
      }`}
    >
      {/* Header - Resource Name and Type */}
      <div className="p-5 pb-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className={`p-2 rounded-lg ${resourceTypeMeta[resource.type].bg} ${resourceTypeMeta[resource.type].iconColor}`}> 
              {resourceTypeMeta[resource.type].icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[var(--navy)] truncate">{resource.name}</h3>
              <p className="text-xs text-muted-foreground capitalize">{resource.type.replace('s', '')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Section */}
      <div className="px-5 pt-4 pb-3">
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              {costLabel}
            </span>
            <span className="text-sm text-[var(--navy)] font-semibold">{formatCurrency(resource.initialCost)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Monthly Cost</span>
            <span className="text-sm text-muted-foreground">{formatCurrency(resource.monthlyCost)}</span>
          </div>
        </div>
      </div>

      {/* Meta Information */}
      <div className="px-5 pb-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Status</span>
          <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor()}`}>
            {resource.status.replace('-', ' ')}
          </span>
        </div>

        {resource.department && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Department</span>
            <span className="text-xs text-[var(--navy)]">{resource.department}</span>
          </div>
        )}

        {resource.location && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Location</span>
            <span className="text-xs text-[var(--navy)]">{resource.location}</span>
          </div>
        )}
      </div>

      {/* Compatibility Summary */}
      {/* Compatibility Badges z popoverem */}
      {compatibilityBadges.length > 0 && (
        <div className="px-5 pb-3 flex gap-2">
          {compatibilityBadges.map(badge => (
            <ResourceListPopover
              key={badge.type}
              trigger={
                <span
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer select-none ${resourceTypeMeta[badge.type].bg} ${resourceTypeMeta[badge.type].iconColor}`}
                >
                  {resourceTypeMeta[badge.type].icon}
                  <span>{badge.type === 'machines' ? 'Machines' : 'Devices'}</span>
                  <span className="font-bold">{badge.count}</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </span>
              }
              title={badge.type === 'machines' ? 'Compatible Machines' : 'Compatible Devices'}
              type={badge.type.slice(0, -1) as 'machine' | 'device'}
              resources={getCompatibleItems(badge.type)}
            />
          ))}
        </div>
      )}

      {/* Footer with Actions */}
      <div className="px-5 pb-5 pt-2 border-t border-border">
        <button
          onClick={() => onSelect(resource.id)}
          className={`w-full py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
            isSelected
              ? 'bg-[var(--mint)] text-white hover:bg-[var(--mint-dark)]'
              : 'bg-muted text-[var(--navy)] hover:bg-[var(--mint)] hover:text-white'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm">Selected</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add to Set</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
