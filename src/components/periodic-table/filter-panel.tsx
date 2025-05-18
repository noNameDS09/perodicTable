
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { elementCategories, elementPhases } from '@/data/elements'; // Ensure these are exported from elements.ts
import { capitalize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterPanelProps {
  filters: { category?: string; phase?: string };
  onFilterChange: (filterType: 'category' | 'phase', value: string) => void;
  onResetFilters: () => void;
}

const ALL_ITEMS_SENTINEL_VALUE = "__ALL_ITEMS__";

export function FilterPanel({ filters, onFilterChange, onResetFilters }: FilterPanelProps) {
  return (
    <div className="p-4 bg-card rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Filter Elements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
        <div>
          <Label htmlFor="category-filter" className="text-sm font-medium">Category</Label>
          <Select
            value={filters.category || ""} // Select value can be "" to show placeholder
            onValueChange={(value) => onFilterChange('category', value === ALL_ITEMS_SENTINEL_VALUE ? "" : value)}
          >
            <SelectTrigger id="category-filter" className="w-full mt-1">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_ITEMS_SENTINEL_VALUE}>All Categories</SelectItem>
              {elementCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {capitalize(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="phase-filter" className="text-sm font-medium">Standard State (Phase)</Label>
          <Select
            value={filters.phase || ""} // Select value can be "" to show placeholder
            onValueChange={(value) => onFilterChange('phase', value === ALL_ITEMS_SENTINEL_VALUE ? "" : value)}
          >
            <SelectTrigger id="phase-filter" className="w-full mt-1">
              <SelectValue placeholder="All Phases" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_ITEMS_SENTINEL_VALUE}>All Phases</SelectItem>
              {elementPhases.map((phase) => (
                <SelectItem key={phase} value={phase}>
                  {capitalize(phase)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={onResetFilters} variant="outline" className="w-full sm:w-auto">
          <X className="mr-2 h-4 w-4" /> Reset Filters
        </Button>
      </div>
    </div>
  );
}
