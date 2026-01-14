import { X, User, Cpu, Smartphone, Save, Share2 } from 'lucide-react';
import { Resource } from '../Type';

interface AllocationPanelProps {
  selectedResources: Resource[];
  onRemoveResource: (id: string) => void;
  onClearAll: () => void;
}

export function AllocationPanel({ selectedResources, onRemoveResource, onClearAll }: AllocationPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'employee':
        return <User className="w-4 h-4" />;
      case 'machines':
        return <Cpu className="w-4 h-4" />;
      case 'devices':
        return <Smartphone className="w-4 h-4" />;
    }
  };

  const groupedResources = {
    employee: selectedResources.filter(r => r.type === 'employee'),
    machines: selectedResources.filter(r => r.type === 'machines'),
    devices: selectedResources.filter(r => r.type === 'devices')
  };

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
                    {getIcon(type)}
                    <span className="capitalize">{type}</span>
                    <span className="text-xs text-muted-foreground">({resources.length})</span>
                  </h3>
                  <div className="space-y-2">
                    {resources.map(resource => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex-1">
                          <p className="text-sm text-[var(--navy)]">{resource.name}</p>
                          <p className="text-xs text-muted-foreground">{resource.department || resource.location}</p>
                        </div>
                        <button
                          onClick={() => onRemoveResource(resource.id)}
                          className="p-1 hover:bg-red-100 rounded transition-colors"
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
          <button className="w-full bg-[var(--navy)] text-white py-3 rounded-lg hover:bg-[var(--navy-light)] transition-colors flex items-center justify-center gap-2">
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