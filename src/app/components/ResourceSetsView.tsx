
import { ResourceSetTable } from './ResourceSetTable';

import type { ResourceSet } from './ResourceSetTable';

interface ResourceSetsViewProps {
  sets: ResourceSet[];
  onDeleteSet: (id: string) => void;
  onEditSet: (id: string) => void;
}

export function ResourceSetsView({ sets, onDeleteSet, onEditSet }: ResourceSetsViewProps) {
  return <ResourceSetTable sets={sets} showActions onDeleteSet={onDeleteSet} onEditSet={onEditSet} />;
}