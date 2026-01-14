import { ResourceCard, Resource } from './ResourceCard';

interface ResourceGridProps {
  resources: Resource[];
  selectedResources: string[];
  onSelectResource: (id: string) => void;
  allResources: Resource[];
}

export function ResourceGrid({ resources, selectedResources, onSelectResource, allResources }: ResourceGridProps) {
  if (resources.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">No resources found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map(resource => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          isSelected={selectedResources.includes(resource.id)}
          onSelect={onSelectResource}
          allResources={allResources}
        />
      ))}
    </div>
  );
}