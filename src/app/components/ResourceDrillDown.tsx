import { X, User, Cpu, Smartphone, Plus, ChevronRight } from 'lucide-react';
import { Resource } from './ResourceCard';
import * as Tooltip from '@radix-ui/react-tooltip';
import { getResourceIcon, getResourceTypeColors, ResourceType } from '../Type';

interface ResourceDrillDownProps {
  resource: Resource;
  allResources: Resource[];
  onClose: () => void;
  onSelectResource: (id: string) => void;
}

export function ResourceDrillDown({ resource, allResources, onClose, onSelectResource }: ResourceDrillDownProps) {
  const getResourceById = (id: string) => allResources.find(r => r.id === id);



  const renderEmployeeDrillDown = () => {
    // Show machines they can operate and devices compatible with both
    const machines = (resource.compatibleMachineIds || [])
      .map(id => getResourceById(id))
      .filter(Boolean) as Resource[];

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm text-[var(--navy)] mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[var(--machine-color)]" />
            <span>Machines this employee can operate</span>
            <span className="text-xs text-muted-foreground">({machines.length})</span>
          </h3>
          <div className="space-y-2">
            {machines.map(machine => {
              // Find devices compatible with both the employee and this machine
              const sharedDeviceIds = resource.compatibleDeviceIds?.filter(
                deviceId => machine.compatibleDeviceIds?.includes(deviceId)
              ) || [];
              const sharedDevices = sharedDeviceIds.map(id => getResourceById(id)).filter(Boolean) as Resource[];

              return (
                <div key={machine.id} className="bg-white border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-3 bg-[var(--machine-bg)]/30 hover:bg-[var(--machine-bg)]/50 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-[var(--machine-bg)] rounded-lg">
                        <Cpu className="w-4 h-4 text-[var(--machine-color)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--navy)] truncate">{machine.name}</p>
                        <p className="text-xs text-muted-foreground">{machine.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectResource(machine.id)}
                      className="p-2 hover:bg-[var(--machine-color)] hover:text-white rounded-lg transition-colors flex-shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {sharedDevices.length > 0 && (
                    <div className="p-3 bg-muted/30 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        Compatible devices for this pairing:
                      </p>
                      <div className="space-y-1 pl-4">
                        {sharedDevices.map(device => (
                          <div key={device.id} className="flex items-center justify-between p-2 bg-white rounded border border-[var(--device-color)]/20 hover:border-[var(--device-color)]/40 transition-colors">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <Smartphone className="w-3.5 h-3.5 text-[var(--device-color)] flex-shrink-0" />
                              <span className="text-xs text-[var(--navy)] truncate">{device.name}</span>
                            </div>
                            <button
                              onClick={() => onSelectResource(device.id)}
                              className="p-1 hover:bg-[var(--device-color)] hover:text-white rounded transition-colors flex-shrink-0"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {machines.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No compatible machines</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderMachineDrillDown = () => {
    // Show employees who can operate it and devices compatible with both
    const employees = (resource.compatibleEmployeeIds || [])
      .map(id => getResourceById(id))
      .filter(Boolean) as Resource[];

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm text-[var(--navy)] mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-[var(--employee-color)]" />
            <span>Employees who can operate this machine</span>
            <span className="text-xs text-muted-foreground">({employees.length})</span>
          </h3>
          <div className="space-y-2">
            {employees.map(employee => {
              // Find devices compatible with both the machine and this employee
              const sharedDeviceIds = resource.compatibleDeviceIds?.filter(
                deviceId => employee.compatibleDeviceIds?.includes(deviceId)
              ) || [];
              const sharedDevices = sharedDeviceIds.map(id => getResourceById(id)).filter(Boolean) as Resource[];

              return (
                <div key={employee.id} className="bg-white border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-3 bg-[var(--employee-bg)]/30 hover:bg-[var(--employee-bg)]/50 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-[var(--employee-bg)] rounded-lg">
                        <User className="w-4 h-4 text-[var(--employee-color)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--navy)] truncate">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{employee.department}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectResource(employee.id)}
                      className="p-2 hover:bg-[var(--employee-color)] hover:text-white rounded-lg transition-colors flex-shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {sharedDevices.length > 0 && (
                    <div className="p-3 bg-muted/30 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        Compatible devices for this pairing:
                      </p>
                      <div className="space-y-1 pl-4">
                        {sharedDevices.map(device => (
                          <div key={device.id} className="flex items-center justify-between p-2 bg-white rounded border border-[var(--device-color)]/20 hover:border-[var(--device-color)]/40 transition-colors">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <Smartphone className="w-3.5 h-3.5 text-[var(--device-color)] flex-shrink-0" />
                              <span className="text-xs text-[var(--navy)] truncate">{device.name}</span>
                            </div>
                            <button
                              onClick={() => onSelectResource(device.id)}
                              className="p-1 hover:bg-[var(--device-color)] hover:text-white rounded transition-colors flex-shrink-0"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {employees.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No compatible employees</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDeviceDrillDown = () => {
    // Show machines it's compatible with and employees who can operate both
    const machines = (resource.compatibleMachineIds || [])
      .map(id => getResourceById(id))
      .filter(Boolean) as Resource[];

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm text-[var(--navy)] mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[var(--machine-color)]" />
            <span>Machines compatible with this device</span>
            <span className="text-xs text-muted-foreground">({machines.length})</span>
          </h3>
          <div className="space-y-2">
            {machines.map(machine => {
              // Find employees who can operate both the device and this machine
              const sharedEmployeeIds = resource.compatibleEmployeeIds?.filter(
                employeeId => machine.compatibleEmployeeIds?.includes(employeeId)
              ) || [];
              const sharedEmployees = sharedEmployeeIds.map(id => getResourceById(id)).filter(Boolean) as Resource[];

              return (
                <div key={machine.id} className="bg-white border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-3 bg-[var(--machine-bg)]/30 hover:bg-[var(--machine-bg)]/50 transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-[var(--machine-bg)] rounded-lg">
                        <Cpu className="w-4 h-4 text-[var(--machine-color)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--navy)] truncate">{machine.name}</p>
                        <p className="text-xs text-muted-foreground">{machine.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectResource(machine.id)}
                      className="p-2 hover:bg-[var(--machine-color)] hover:text-white rounded-lg transition-colors flex-shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {sharedEmployees.length > 0 && (
                    <div className="p-3 bg-muted/30 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <ChevronRight className="w-3 h-3" />
                        Employees who can operate this pairing:
                      </p>
                      <div className="space-y-1 pl-4">
                        {sharedEmployees.map(employee => (
                          <div key={employee.id} className="flex items-center justify-between p-2 bg-white rounded border border-[var(--employee-color)]/20 hover:border-[var(--employee-color)]/40 transition-colors">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <User className="w-3.5 h-3.5 text-[var(--employee-color)] flex-shrink-0" />
                              <span className="text-xs text-[var(--navy)] truncate">{employee.name}</span>
                            </div>
                            <button
                              onClick={() => onSelectResource(employee.id)}
                              className="p-1 hover:bg-[var(--employee-color)] hover:text-white rounded transition-colors flex-shrink-0"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {machines.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No compatible machines</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const typeColors = getResourceTypeColors(resource.type as ResourceType);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with breadcrumb */}
        <div className={`p-6 border-b border-border ${typeColors.bg}`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`p-3 bg-white rounded-lg shadow-sm`}>
                <div className={typeColors.icon}>
                  {getResourceIcon(resource.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <h2 className={`${typeColors.color} truncate cursor-help`}>{resource.name}</h2>
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
                <p className="text-sm text-muted-foreground capitalize">{resource.type.replace('s', '')}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-[var(--navy)]" />
            </button>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span>Contextual Drill-down</span>
            <ChevronRight className="w-3 h-3" />
            <span className="capitalize">{resource.type.replace('s', '')}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {resource.type === 'employees' && renderEmployeeDrillDown()}
          {resource.type === 'machines' && renderMachineDrillDown()}
          {resource.type === 'devices' && renderDeviceDrillDown()}
        </div>
      </div>
    </div>
  );
}
