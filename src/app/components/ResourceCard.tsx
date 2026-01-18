
import { JSX, useState } from 'react';
import { User, Cpu, Smartphone, Plus, Check, DollarSign, Eye } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ResourceType, Resource, getResourceIcon, getResourceTypeColors } from '../Type';

export type { Resource };

interface ResourceCardProps {
  resource: Resource;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDrillDown: (resource: Resource) => void;
  allResources: Resource[];
}

export function ResourceCard({ resource, isSelected, onSelect, onDrillDown, allResources }: ResourceCardProps) {
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const typeColors = getResourceTypeColors(resource.type);

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
      type: ResourceType;
    }> = [];

    if (resource.type === ResourceType.Employees) {
      if (resource.compatibleMachineIds && resource.compatibleMachineIds.length > 0) {
        badges.push({
          key: 'machines',
          icon: <Cpu className="w-3.5 h-3.5" />,
          label: 'Machines',
          count: resource.compatibleMachineIds.length,
          ids: resource.compatibleMachineIds,
          type: ResourceType.Machines
        });
      }
      if (resource.compatibleDeviceIds && resource.compatibleDeviceIds.length > 0) {
        badges.push({
          key: 'devices',
          icon: <Smartphone className="w-3.5 h-3.5" />,
          label: 'Devices',
          count: resource.compatibleDeviceIds.length,
          ids: resource.compatibleDeviceIds,
          type: ResourceType.Devices
        });
      }
    } else if (resource.type === ResourceType.Machines) {
      if (resource.compatibleEmployeeIds && resource.compatibleEmployeeIds.length > 0) {
        badges.push({
          key: 'operators',
          icon: <User className="w-3.5 h-3.5" />,
          label: 'Operators',
          count: resource.compatibleEmployeeIds.length,
          ids: resource.compatibleEmployeeIds,
          type: ResourceType.Employees
        });
      }
      if (resource.compatibleDeviceIds && resource.compatibleDeviceIds.length > 0) {
        badges.push({
          key: 'devices',
          icon: <Smartphone className="w-3.5 h-3.5" />,
          label: 'Devices',
          count: resource.compatibleDeviceIds.length,
          ids: resource.compatibleDeviceIds,
          type:  ResourceType.Devices
        });
      }
    } else if (resource.type === ResourceType.Devices) {
      if (resource.compatibleMachineIds && resource.compatibleMachineIds.length > 0) {
        badges.push({
          key: 'machines',
          icon: <Cpu className="w-3.5 h-3.5" />,
          label: 'Machines',
          count: resource.compatibleMachineIds.length,
          ids: resource.compatibleMachineIds,
          type:  ResourceType.Machines
        });
      }
      if (resource.compatibleEmployeeIds && resource.compatibleEmployeeIds.length > 0) {
        badges.push({
          key: 'operators',
          icon: <User className="w-3.5 h-3.5" />,
          label: 'Operators',
          count: resource.compatibleEmployeeIds.length,
          ids: resource.compatibleEmployeeIds,
          type:  ResourceType.Employees
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
    if (badge.type === ResourceType.Employees) {
      return renderOperatorsPopover(badge.ids);
    } else if (badge.type ===  ResourceType.Devices) {
      return renderDevicesPopover(badge.ids);
    } else if (badge.type ===  ResourceType.Machines) {
      return renderMachinesPopover(badge.ids);
    }
    return null;
  };

  const badges = getCompatibilityBadges();
  const costLabel = resource.type === 'employees' ? 'Hiring Cost' : 'Purchase Cost';

  return (
    <div
      className={`bg-white rounded-xl border-2 transition-all hover:shadow-md ${
        isSelected
          ? `${typeColors.border} shadow-lg`
          : `border-border hover:border-[var(--mint)]/30`
      }`}
    >
      {/* Header - Resource Name and Type */}
      <div className="p-5 pb-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`p-2 rounded-lg ${typeColors.bg}`}>
              <div className={typeColors.icon}>
                {getResourceIcon(resource.type)}
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
            className="p-2 rounded-lg transition-colors bg-muted text-[var(--navy)] hover:bg-[var(--mint)] hover:text-white flex-shrink-0 ml-2"
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

        <div className="pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground block mb-2">Compatibility</span>
          <div className="flex flex-wrap gap-1 min-h-[2.25rem] items-center">
            {badges.length > 0 ? (
              badges.map((badge) => {
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
                      <span className={`flex items-center gap-1.5 px-2.5 py-1.5 ${badgeTypeColors.bg} hover:opacity-80 rounded-lg transition-opacity border border-transparent cursor-pointer`}>
                        <span className={badgeTypeColors.color}>{badge.icon}</span>
                        <span className={`text-xs ${badgeTypeColors.color}`}>{badge.label}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className={`text-xs ${badgeTypeColors.color} font-medium`}>{badge.count}</span>
                      </span>
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
              })
            ) : (
              <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-md">None</span>
            )}
          </div>
        </div>
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
