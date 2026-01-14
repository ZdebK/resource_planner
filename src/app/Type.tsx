
import { Filter, User, Cpu, Smartphone } from 'lucide-react';
import { JSX } from 'react';

export type ResourceTypeId = 'all' | 'employee' | 'machines' | 'devices';

export interface ResourceTypeMeta {
  id: ResourceTypeId;
  label: string;
  icon: JSX.Element;
  bg: string;
  iconColor: string;
}

export const resourceTypeMeta: Record<ResourceTypeId, ResourceTypeMeta> = {
  all: {
    id: 'all',
    label: 'All Resources',
    icon: <Filter className="w-5 h-5" />, 
    bg: 'bg-gray-200',
    iconColor: 'text-gray-500',
  },
  employee: {
    id: 'employee',
    label: 'Employee',
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
  type: 'employees' | 'machines' | 'devices';
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

