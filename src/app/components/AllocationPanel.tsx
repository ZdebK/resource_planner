import { X, Save, Share2, DollarSign } from 'lucide-react';
import { Resource, ResourceType, getResourceIcon } from '../Type';

interface AllocationPanelProps {
  selectedResources: Resource[];
  onRemoveResource: (id: string) => void;
  onClearAll: () => void;
  onSaveSet: () => void;
}

export function AllocationPanel({ selectedResources, onRemoveResource, onClearAll, onSaveSet }: AllocationPanelProps) {

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  const calculateTotalCosts = () => {
    const totalInitial = selectedResources.reduce((sum, r) => sum + r.initialCost, 0);
    const totalMonthly = selectedResources.reduce((sum, r) => sum + r.monthlyCost, 0);
    return { totalInitial, totalMonthly };
  };

  const groupedResources = {
    employees: selectedResources.filter(r => r.type ===  ResourceType.Employees),
    machines: selectedResources.filter(r => r.type ===  ResourceType.Machines),
    devices: selectedResources.filter(r => r.type === ResourceType.Devices
    )
  };

  const costs = calculateTotalCosts();

  return (
    <div className="w-96 bg-white border-l-2 border-border flex flex-col shadow-lg">
      <div className="p-6 border-b border-border bg-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[var(--navy)]">Resource Set</h2>
          <span className="text-xs bg-[var(--mint)] text-white px-2 py-1 rounded-full">
            {selectedResources.length} selected
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Build your allocation set</p>
      </div>

      {selectedResources.length > 0 && (
        <div className="p-6 border-b border-border">
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-[var(--navy)]" />
              <span className="text-xs text-[var(--navy)] font-medium">Total Costs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Upfront</span>
              <span className="text-sm text-[var(--navy)] font-semibold">{formatCurrency(costs.totalInitial)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Monthly</span>
              <span className="text-sm text-muted-foreground">{formatCurrency(costs.totalMonthly)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6">
        {selectedResources.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">No resources selected</p>
              <p className="text-xs text-muted-foreground mt-1">Click on resources to add them</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedResources).map(([type, resources]) => {
              if (resources.length === 0) return null;
              
              return (
                <div key={type}>
                  <h3 className="text-sm text-[var(--navy)] mb-3 flex items-center gap-2">
                    {getResourceIcon(ResourceType[type.charAt(0).toUpperCase() + type.slice(1) as keyof typeof ResourceType])}
                    <span className="capitalize">{type}</span>
                    <span className="text-xs text-muted-foreground">({resources.length})</span>
                  </h3>
                  <div className="space-y-2">
                    {resources.map(resource => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[var(--navy)] truncate">{resource.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{resource.department || resource.location}</p>
                        </div>
                        <button
                          onClick={() => onRemoveResource(resource.id)}
                          className="p-1 hover:bg-red-100 rounded transition-colors flex-shrink-0 ml-2"
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedResources.length > 0 && (
        <div className="p-6 border-t border-border space-y-3">
          <button
            onClick={onSaveSet}
            className="w-full bg-[var(--navy)] text-white py-3 rounded-lg hover:bg-[var(--navy-light)] transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Resource Set</span>
          </button>
          <div className="flex gap-2">
            <button className="flex-1 bg-muted text-[var(--navy)] py-2 rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2 text-sm">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button
              onClick={onClearAll}
              className="flex-1 bg-muted text-red-600 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}