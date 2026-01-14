import { JSX, useState } from 'react';
import { User, Cpu, Smartphone, Plus, Check, DollarSign, Eye } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import * as Tooltip from '@radix-ui/react-tooltip';

export interface Resource {
  id: string;
  name: string;
  type: 'employees' | 'machines' | 'devices';
  status: 'available' | 'in-use' | 'maintenance';
  department?: string;
  skills?: string[];
  location?: string;
  initialCost: number;
  monthlyCost: number;
  compatibleMachineIds?: string[];
  compatibleDeviceIds?: string[];
  compatibleEmployeeIds?: string[];
}

interface ResourceCardProps {
  resource: Resource;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDrillDown: (resource: Resource) => void;
  allResources: Resource[];
}

export function ResourceCard({ resource, isSelected, onSelect, onDrillDown, allResources }: ResourceCardProps) {
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const getTypeColors = () => {
    switch (resource.type) {
      case 'employees':
        return {
          bg: 'bg-[var(--employee-bg)]',
          color: 'text-[var(--employee-color)]',
          icon: 'text-[var(--employee-color)]',
          border: 'border-[var(--employee-color)]',
          hover: 'hover:bg-[var(--employee-color)]'
        };
      case 'machines':
        return {
          bg: 'bg-[var(--machine-bg)]',
          color: 'text-[var(--machine-color)]',
          icon: 'text-[var(--machine-color)]',
          border: 'border-[var(--machine-color)]',
          hover: 'hover:bg-[var(--machine-color)]'
        };
      case 'devices':
        return {
          bg: 'bg-[var(--device-bg)]',
          color: 'text-[var(--device-color)]',
          icon: 'text-[var(--device-color)]',
          border: 'border-[var(--device-color)]',
          hover: 'hover:bg-[var(--device-color)]'
        };
    }
  };

  const getIcon = () => {
    switch (resource.type) {
      case 'employees':
        return <User className="w-5 h-5" />;
      case 'machines':
        return <Cpu className="w-5 h-5" />;
      case 'devices':
        return <Smartphone className="w-5 h-5" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  const getCompatibilityBadges = () => {
    const badges: Array<{
      key: string;
      icon: JSX.Element;
      label: string;
      count: number;
      ids: string[];
      type: 'machines' | 'devices' | 'employees';
    }> = [];

    if (resource.type === 'employees') {
      if (resource.compatibleMachineIds && resource.compatibleMachineIds.length > 0) {
        badges.push({
          key: 'machines',
          icon: <Cpu className="w-3.5 h-3.5" />,
          label: 'Machines',
          count: resource.compatibleMachineIds.length,
          ids: resource.compatibleMachineIds,
          type: 'machines'
        });
      }
      if (resource.compatibleDeviceIds && resource.compatibleDeviceIds.length > 0) {
        badges.push({
          key: 'devices',
          icon: <Smartphone className="w-3.5 h-3.5" />,
          label: 'Devices',
          count: resource.compatibleDeviceIds.length,
          ids: resource.compatibleDeviceIds,
          type: 'devices'
        });
      }
    } else if (resource.type === 'machines') {
      if (resource.compatibleEmployeeIds && resource.compatibleEmployeeIds.length > 0) {
        badges.push({
          key: 'operators',
          icon: <User className="w-3.5 h-3.5" />,
          label: 'Operators',
          count: resource.compatibleEmployeeIds.length,
          ids: resource.compatibleEmployeeIds,
          type: 'employees'
        });
      }
      if (resource.compatibleDeviceIds && resource.compatibleDeviceIds.length > 0) {
        badges.push({
          key: 'devices',
          icon: <Smartphone className="w-3.5 h-3.5" />,
          label: 'Devices',
          count: resource.compatibleDeviceIds.length,
          ids: resource.compatibleDeviceIds,
          type: 'devices'
        });
      }
    } else if (resource.type === 'devices') {
      if (resource.compatibleMachineIds && resource.compatibleMachineIds.length > 0) {
        badges.push({
          key: 'machines',
          icon: <Cpu className="w-3.5 h-3.5" />,
          label: 'Machines',
          count: resource.compatibleMachineIds.length,
          ids: resource.compatibleMachineIds,
          type: 'machines'
        });
      }
      if (resource.compatibleEmployeeIds && resource.compatibleEmployeeIds.length > 0) {
        badges.push({
          key: 'operators',
          icon: <User className="w-3.5 h-3.5" />,
          label: 'Operators',
          count: resource.compatibleEmployeeIds.length,
          ids: resource.compatibleEmployeeIds,
          type: 'employees'
        });
      }
    }

    return badges;
  };

  const renderOperatorsPopover = (operatorIds: string[]) => {
    const operators = operatorIds.map(id => allResources.find(r => r.id === id)).filter(Boolean) as Resource[];
    
    return (
      <div className="w-64 max-h-96 overflow-y-auto">
        <div className="space-y-1.5">
          {operators.map(operator => (
            <div key={operator.id} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <User className="w-4 h-4 text-[var(--employee-color)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[var(--navy)] truncate">{operator.name}</div>
                  {operator.department && (
                    <div className="text-xs text-muted-foreground">{operator.department}</div>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(operator.id);
                  setOpenPopover(null);
                }}
                className="p-1 hover:bg-[var(--employee-color)] hover:text-white rounded transition-colors flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDevicesPopover = (deviceIds: string[]) => {
    const devices = deviceIds.map(id => allResources.find(r => r.id === id)).filter(Boolean) as Resource[];
    
    return (
      <div className="w-64 max-h-96 overflow-y-auto">
        <div className="space-y-1.5">
          {devices.map(device => (
            <div key={device.id} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Smartphone className="w-4 h-4 text-[var(--device-color)] flex-shrink-0" />
                <span className="text-sm text-[var(--navy)] truncate">{device.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(device.id);
                  setOpenPopover(null);
                }}
                className="p-1 hover:bg-[var(--device-color)] hover:text-white rounded transition-colors flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMachinesPopover = (machineIds: string[]) => {
    const machines = machineIds.map(id => allResources.find(r => r.id === id)).filter(Boolean) as Resource[];
    
    return (
      <div className="w-64 max-h-96 overflow-y-auto">
        <div className="space-y-1.5">
          {machines.map(machine => (
            <div key={machine.id} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Cpu className="w-4 h-4 text-[var(--machine-color)] flex-shrink-0" />
                <span className="text-sm text-[var(--navy)] truncate">{machine.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(machine.id);
                  setOpenPopover(null);
                }}
                className="p-1 hover:bg-[var(--machine-color)] hover:text-white rounded transition-colors flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPopoverContent = (badge: ReturnType<typeof getCompatibilityBadges>[0]) => {
    if (badge.type === 'employees') {
      return renderOperatorsPopover(badge.ids);
    } else if (badge.type === 'devices') {
      return renderDevicesPopover(badge.ids);
    } else if (badge.type === 'machines') {
      return renderMachinesPopover(badge.ids);
    }
    return null;
  };

  const badges = getCompatibilityBadges();
  const costLabel = resource.type === 'employees' ? 'Hiring Cost' : 'Purchase Cost';
  const typeColors = getTypeColors();

  return (
    <div
      className={`bg-white rounded-xl border-2 transition-all hover:shadow-md ${
        isSelected
          ? `${typeColors.border} shadow-lg`
          : 'border-border hover:border-[var(--mint)]/30'
      }`}
    >
      {/* Header - Resource Name and Type */}
      <div className="p-5 pb-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`p-2 rounded-lg ${typeColors.bg}`}>
              <div className={typeColors.icon}>
                {getIcon()}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <h3 className="text-[var(--navy)] truncate cursor-help">{resource.name}</h3>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-[var(--navy)] text-white px-3 py-2 rounded-lg text-sm shadow-lg z-50"
                      sideOffset={5}
                    >
                      {resource.name}
                      <Tooltip.Arrow className="fill-[var(--navy)]" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <p className="text-xs text-muted-foreground capitalize">{resource.type.replace('s', '')}</p>
            </div>
          </div>
          <button
            onClick={() => onDrillDown(resource)}
            className={`p-2 rounded-lg transition-colors ${typeColors.bg} ${typeColors.hover} hover:text-white flex-shrink-0 ml-2`}
            title="View compatibility details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cost Section */}
      <div className="px-5 pt-4 pb-3">
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
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

      {/* Compatibility Badges */}
      {badges.length > 0 && (
        <div className="px-5 pb-3">
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => {
              const badgeTypeColors = badge.type === 'employees' 
                ? { bg: 'bg-[var(--employee-bg)]', color: 'text-[var(--employee-color)]' }
                : badge.type === 'machines'
                ? { bg: 'bg-[var(--machine-bg)]', color: 'text-[var(--machine-color)]' }
                : { bg: 'bg-[var(--device-bg)]', color: 'text-[var(--device-color)]' };

              return (
                <Popover.Root
                  key={badge.key}
                  open={openPopover === badge.key}
                  onOpenChange={(open) => setOpenPopover(open ? badge.key : null)}
                >
                  <Popover.Trigger asChild>
                    <button className={`flex items-center gap-1.5 px-2.5 py-1.5 ${badgeTypeColors.bg} hover:opacity-80 rounded-lg transition-opacity border border-transparent`}>
                      <div className={badgeTypeColors.color}>{badge.icon}</div>
                      <span className={`text-xs ${badgeTypeColors.color}`}>{badge.label}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className={`text-xs ${badgeTypeColors.color} font-medium`}>{badge.count}</span>
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      className="bg-white rounded-xl shadow-lg border border-border p-3 z-50 animate-in fade-in-0 zoom-in-95"
                      sideOffset={5}
                      collisionPadding={10}
                    >
                      {renderPopoverContent(badge)}
                      <Popover.Arrow className="fill-white" />
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              );
            })}
          </div>
        </div>
      )}

      {/* Meta Information */}
      <div className="px-5 pb-3 space-y-2">
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

        {resource.skills && resource.skills.length > 0 && (
          <div className="pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground block mb-2">Skills</span>
            <div className="flex flex-wrap gap-1">
              {resource.skills.slice(0, 3).map((skill, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-muted rounded-md text-[var(--navy)]">
                  {skill}
                </span>
              ))}
              {resource.skills.length > 3 && (
                <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                  +{resource.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

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
