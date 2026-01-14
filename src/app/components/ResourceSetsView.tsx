import { useState } from 'react';
import { Package, User, Cpu, Smartphone, Trash2, Edit2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Resource } from './ResourceCard';

export interface ResourceSet {
  id: string;
  name: string;
  resources: Resource[];
  createdAt: Date;
}

interface ResourceSetsViewProps {
  sets: ResourceSet[];
  onDeleteSet: (id: string) => void;
  onEditSet: (id: string) => void;
}

export function ResourceSetsView({ sets, onDeleteSet, onEditSet }: ResourceSetsViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  const getResourceByType = (resources: Resource[], type: 'employees' | 'machines' | 'devices'): Resource | undefined => {
    return resources.find(r => r.type === type);
  };

  const calculateSetCosts = (resources: Resource[]) => {
    const totalInitial = resources.reduce((sum, r) => sum + r.initialCost, 0);
    const totalMonthly = resources.reduce((sum, r) => sum + r.monthlyCost, 0);
    return { totalInitial, totalMonthly };
  };

  const totalPages = Math.ceil(sets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSets = sets.slice(startIndex, endIndex);

  if (sets.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">No resource sets created</p>
          <p className="text-sm text-muted-foreground">Build and save resource sets to see them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-muted-foreground font-medium">Set Name</th>
                <th className="px-4 py-3 text-left text-xs text-muted-foreground font-medium">Employee</th>
                <th className="px-4 py-3 text-left text-xs text-muted-foreground font-medium">Machine</th>
                <th className="px-4 py-3 text-left text-xs text-muted-foreground font-medium">Device</th>
                <th className="px-4 py-3 text-right text-xs text-muted-foreground font-medium">Upfront Cost</th>
                <th className="px-4 py-3 text-right text-xs text-muted-foreground font-medium">Monthly Cost</th>
                <th className="px-4 py-3 text-right text-xs text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentSets.map((set) => {
                const costs = calculateSetCosts(set.resources);
                const employee = getResourceByType(set.resources, 'employees');
                const machine = getResourceByType(set.resources, 'machines');
                const device = getResourceByType(set.resources, 'devices');

                return (
                  <tr key={set.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[var(--navy)] flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-[var(--navy)] font-medium truncate">{set.name}</p>
                          <p className="text-xs text-muted-foreground">{set.resources.length} resources</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {employee ? (
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-[var(--employee-bg)] rounded">
                            <User className="w-3.5 h-3.5 text-[var(--employee-color)]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-[var(--navy)] truncate">{employee.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{employee.department}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {machine ? (
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-[var(--machine-bg)] rounded">
                            <Cpu className="w-3.5 h-3.5 text-[var(--machine-color)]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-[var(--navy)] truncate">{machine.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{machine.location}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {device ? (
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-[var(--device-bg)] rounded">
                            <Smartphone className="w-3.5 h-3.5 text-[var(--device-color)]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-[var(--navy)] truncate">{device.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{device.department}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <p className="text-sm text-[var(--navy)] font-semibold">{formatCurrency(costs.totalInitial)}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <p className="text-sm text-muted-foreground">{formatCurrency(costs.totalMonthly)}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEditSet(set.id)}
                          className="p-1.5 hover:bg-muted rounded-lg transition-colors"
                          title="Edit set"
                        >
                          <Edit2 className="w-4 h-4 text-[var(--navy)]" />
                        </button>
                        <button
                          onClick={() => onDeleteSet(set.id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete set"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-border flex items-center justify-between bg-muted/30">
            <div className="text-xs text-muted-foreground">
              Showing {startIndex + 1}–{Math.min(endIndex, sets.length)} of {sets.length} resource sets
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 text-[var(--navy)]" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        currentPage === pageNum
                          ? 'bg-[var(--navy)] text-white'
                          : 'hover:bg-muted text-[var(--navy)]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 text-[var(--navy)]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}