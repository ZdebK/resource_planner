
import { FilterUtils } from '../FilterUtils';
import { Resource, ResourceType } from '../Type';
import { AdvancedFilter } from '../components/AdvancedFilters';

describe('applyAdvancedFilters', () => {
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
  const employee2: Resource = {
    id: 'h4',
    name: 'John Doe',
    type: ResourceType.Employees,
    status: 'available',
    department: 'QA',
    skills: ['Testing'],
    location: 'Building B',
    initialCost: 15000,
    monthlyCost: 6000,
    compatibleMachineIds: [],
    compatibleDeviceIds: ['d9'],
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
  const allEmployees = [employee, employee2];

  it('returns all resources if no filters', () => {
    expect(FilterUtils.applyAdvancedFilters(allEmployees, [])).toEqual(allEmployees);
  });

  it('filters employees by compatible machine (OR)', () => {
    const filters: AdvancedFilter[] = [
      { id: '1', type: ResourceType.Machines, resourceId: 'm4', logic: 'OR' },
    ];
    const result = FilterUtils.applyAdvancedFilters(allEmployees, filters);
    expect(result).toEqual([employee]);
  });

  it('filters employees by compatible device (OR)', () => {
    const filters: AdvancedFilter[] = [
      { id: '1', type: ResourceType.Devices, resourceId: 'd9', logic: 'OR' },
    ];
    const result = FilterUtils.applyAdvancedFilters(allEmployees, filters);
    expect(result).toEqual([employee2]);
  });

  it('filters employees by machine OR device (OR)', () => {
    const filters: AdvancedFilter[] = [
      { id: '1', type: ResourceType.Machines, resourceId: 'm4', logic: 'OR' },
      { id: '2', type: ResourceType.Devices, resourceId: 'd9', logic: 'OR' },
    ];
    const result = FilterUtils.applyAdvancedFilters(allEmployees, filters);
    expect(result).toEqual([employee, employee2]);
  });

  it('filters employees by machine AND device (AND)', () => {
    const filters: AdvancedFilter[] = [
      { id: '1', type: ResourceType.Machines, resourceId: 'm4', logic: 'AND' },
      { id: '2', type: ResourceType.Devices, resourceId: 'd3', logic: 'AND' },
    ];
    const result = FilterUtils.applyAdvancedFilters(allEmployees, filters);
    expect(result).toEqual([employee]);
  });

  it('returns empty if no employee matches all AND filters', () => {
    const filters: AdvancedFilter[] = [
      { id: '1', type: ResourceType.Machines, resourceId: 'm4', logic: 'AND' },
      { id: '2', type: ResourceType.Devices, resourceId: 'd9', logic: 'AND' },
    ];
    const result = FilterUtils.applyAdvancedFilters(allEmployees, filters);
    expect(result).toEqual([]);
  });
});
