import { Resource, ResourceType } from './Type';
import { AdvancedFilter } from './components/AdvancedFilters';

export class FilterUtils {
  static matchesFilter(resource: Resource, filter: AdvancedFilter): boolean {
    if (resource.type === ResourceType.Employees) {
      if (filter.type === ResourceType.Machines) {
        return resource.compatibleMachineIds?.includes(filter.resourceId) || false;
      } else if (filter.type === ResourceType.Devices) {
        return resource.compatibleDeviceIds?.includes(filter.resourceId) || false;
      }
      if (filter.type === ResourceType.Employees) {
        return false;
      }
    }
    if (resource.type === ResourceType.Machines) {
      if (filter.type === ResourceType.Employees) {
        return resource.compatibleEmployeeIds?.includes(filter.resourceId) || false;
      } else if (filter.type === ResourceType.Devices) {
        return resource.compatibleDeviceIds?.includes(filter.resourceId) || false;
      }
    }
    if (resource.type === ResourceType.Devices) {
      if (filter.type === ResourceType.Employees) {
        return resource.compatibleEmployeeIds?.includes(filter.resourceId) || false;
      } else if (filter.type === ResourceType.Machines) {
        return resource.compatibleMachineIds?.includes(filter.resourceId) || false;
      }
    }
    return false;
  }

  static applyAdvancedFilters(resources: Resource[], advancedFilters: AdvancedFilter[]): Resource[] {
    if (advancedFilters.length === 0) return resources;

    return resources.filter(resource => {
      const andFilters = advancedFilters.filter(f => f.logic === 'AND');
      const orFilters = advancedFilters.filter(f => f.logic === 'OR');

      if (advancedFilters[0].logic === 'OR') {
        return advancedFilters.some(filter => FilterUtils.matchesFilter(resource, filter));
      }

      const andMatch = andFilters.length === 0 || andFilters.every(filter => FilterUtils.matchesFilter(resource, filter));
      const orMatch = orFilters.length === 0 || orFilters.some(filter => FilterUtils.matchesFilter(resource, filter));

      return andMatch && orMatch;
    });
  }
}
