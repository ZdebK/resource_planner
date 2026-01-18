import { FilterUtils } from '../FilterUtils';
import { Resource, ResourceType } from '../Type';
import { AdvancedFilter } from '../components/AdvancedFilters';

describe('matchesFilter', () => {
  const employee: Resource = {
    id: 'h3',
    name: 'Emily Rodriguez',
    type: ResourceType.Employees,
    status: 'in-use',
    department: 'Engineering',
    skills: ['Robotics', 'Automation'],
    location: 'Building A',
    initialCost: 18000,
    monthlyCost: 7200,
    compatibleMachineIds: ['m4', 'm8', 'm15'],
    compatibleDeviceIds: ['d3', 'd5', 'd11'],
  };
  const machine: Resource = {
    id: 'm4',
    name: 'Robot Arm V5',
    type: ResourceType.Machines,
    status: 'available',
    location: 'Assembly Line A',
    initialCost: 180000,
    monthlyCost: 2400,
    compatibleDeviceIds: ['d3', 'd5', 'd11'],
    compatibleEmployeeIds: ['h3'],
  };
  const device: Resource = {
    id: 'd9',
    name: 'Steam Deck',
    type: ResourceType.Devices,
    status: 'available',
    department: 'QA Testing',
    initialCost: 650,
    monthlyCost: 30,
    compatibleMachineIds: [],
    compatibleEmployeeIds: [],
  };

  it('returns true for employee compatible with machine (AND/OR)', () => {
    const filter: AdvancedFilter = {
      id: '1',
      type: ResourceType.Machines,
      resourceId: 'm4',
      logic: 'OR',
    };
    expect(FilterUtils.matchesFilter(employee, filter)).toBe(true);
  });

  it('returns false for employee not compatible with device', () => {
    const filter: AdvancedFilter = {
      id: '2',
      type: ResourceType.Devices,
      resourceId: 'd9',
      logic: 'OR',
    };
    expect(FilterUtils.matchesFilter(employee, filter)).toBe(false);
  });

  it('returns true for employee compatible with machine OR device (OR logic)', () => {
    const filters: AdvancedFilter[] = [
      { id: '1', type: ResourceType.Machines, resourceId: 'm4', logic: 'OR' },
      { id: '2', type: ResourceType.Devices, resourceId: 'd3', logic: 'OR' },
    ];
    // Should match if either filter matches
    expect(filters.some(f => FilterUtils.matchesFilter(employee, f))).toBe(true);
  });

  it('returns false for employee if neither filter matches (OR logic)', () => {
    const filters: AdvancedFilter[] = [
      { id: '1', type: ResourceType.Machines, resourceId: 'm99', logic: 'OR' },
      { id: '2', type: ResourceType.Devices, resourceId: 'd99', logic: 'OR' },
    ];
    expect(filters.some(f => FilterUtils.matchesFilter(employee, f))).toBe(false);
  });

  it('returns true for employee if all filters match (AND logic)', () => {
    const filters: AdvancedFilter[] = [
      { id: '1', type: ResourceType.Machines, resourceId: 'm4', logic: 'AND' },
      { id: '2', type: ResourceType.Devices, resourceId: 'd3', logic: 'AND' },
    ];
    // Should match only if all filters match
    expect(filters.every(f => FilterUtils.matchesFilter(employee, f))).toBe(true);
  });

  it('returns true for employee with Machine OR Device filter (OR logic)', () => {
    const filters: AdvancedFilter[] = [
      { id: '1', type: ResourceType.Machines, resourceId: 'm4', logic: 'OR' },
      { id: '2', type: ResourceType.Devices, resourceId: 'd9', logic: 'OR' },
    ];
    expect(filters.some(f => FilterUtils.matchesFilter(employee, f))).toBe(true);
  });

  it('returns false for employee with Machine AND Device filter (AND logic)', () => {
    const filters: AdvancedFilter[] = [
      { id: '1', type: ResourceType.Machines, resourceId: 'm4', logic: 'AND' },
      { id: '2', type: ResourceType.Devices, resourceId: 'd9', logic: 'AND' },
    ];
    expect(filters.every(f => FilterUtils.matchesFilter(employee, f))).toBe(false);
  });
});
