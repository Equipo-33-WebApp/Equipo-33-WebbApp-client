import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@/components/icons';

interface SortableHeaderProps {
  column: string;
  label: string;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  onSort: (column: string) => void;
  className?: string;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({ column, label, sortColumn, sortDirection, onSort, className }) => (
  <th
    className={`px-4 py-2 cursor-pointer ${className}`}
    onClick={() => onSort(column)}
  >
    <div className="flex items-center space-x-1">
      <span>{label}</span>
      {sortColumn === column && (
        sortDirection === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />
      )}
    </div>
  </th>
);
