// Shared color mapping for resource types
export function getResourceTypeColors(type: ResourceType) {
  switch (type) {
    case ResourceType.Employees:
      return {
        bg: 'bg-[var(--employee-bg)]',
        color: 'text-[var(--employee-color)]',
        icon: 'text-[var(--employee-color)]',
        border: 'border-[var(--employee-color)]',
        hover: 'hover:bg-[var(--employee-color)]',
      };
    case ResourceType.Machines:
      return {
        bg: 'bg-[var(--machine-bg)]',
        color: 'text-[var(--machine-color)]',
        icon: 'text-[var(--machine-color)]',
        border: 'border-[var(--machine-color)]',
        hover: 'hover:bg-[var(--machine-color)]',
      };
    case ResourceType.Devices:
      return {
        bg: 'bg-[var(--device-bg)]',
        color: 'text-[var(--device-color)]',
        icon: 'text-[var(--device-color)]',
        border: 'border-[var(--device-color)]',
        hover: 'hover:bg-[var(--device-color)]',
      };
    default:
      return { bg: '', color: '', icon: '', border: '', hover: '' };
  }
}
import { Filter, User, Cpu, Smartphone } from 'lucide-react';
import { JSX } from 'react';

// Resource type (plural only)
export enum ResourceType {
  Machines = 'machines',
  Devices = 'devices',
  Employees = 'employees',
}

export function getResourceIcon(type: ResourceType) {
  switch (type) {
    case ResourceType.Machines:
      return <Cpu className="w-4 h-4" />;
    case ResourceType.Devices:
      return <Smartphone className="w-4 h-4" />;
    case ResourceType.Employees:
      return <User className="w-4 h-4" />;
    default:
      return null;
  }
}

export type ResourceTypeId = 'all' | ResourceType;

export interface ResourceTypeMeta {
  id: string;
  label: string;
  icon: JSX.Element;
  bg: string;
  iconColor: string;
}

export const resourceTypeFilters: Record<string, ResourceTypeMeta> = {
  all: {
    id: 'all',
    label: 'All Resources',
    icon: <Filter className="w-5 h-5" />, 
    bg: 'bg-gray-200',
    iconColor: 'text-gray-500',
  },
  employees: {
    id: 'employees',
    label: 'Employees',
    icon: <User className="w-5 h-5" />, 
    bg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  machines: {
    id: 'machines',
    label: 'Machines',
    icon: <Cpu className="w-5 h-5" />, 
    bg: 'bg-fuchsia-100',
    iconColor: 'text-fuchsia-900',
  },
  devices: {
    id: 'devices',
    label: 'Devices',
    icon: <Smartphone className="w-5 h-5" />, 
    bg: 'bg-cyan-100',
    iconColor: 'text-cyan-700',
  },
};

// Typy zasobów zgodne z mockResources
export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  status: 'available' | 'in-use' | 'maintenance';
  department?: string;
  skills?: string[];
  specs?: string[];
  location?: string;
  // Cost attributes
  initialCost: number; // Purchase cost for machines/devices, hiring cost for employees
  monthlyCost: number; // Recurring monthly cost
  // Compatibility relationships
  compatibleMachineIds?: string[];
  compatibleDeviceIds?: string[];
  compatibleEmployeeIds?: string[];
}

export interface ResourceCardProps {
  resource: Resource;
  isSelected: boolean;
  onSelect: (id: string) => void;
  allResources: Resource[];
}

