"use client";

import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/header';
import { PeriodicTable } from '@/components/periodic-table/periodic-table';
import { FilterPanel } from '@/components/periodic-table/filter-panel';
import { AISuggestionTool } from '@/components/ai/ai-suggestion-tool';
import { elements as allElementsData } from '@/data/elements';

interface Filters {
  category?: string;
  phase?: string;
}

export default function ElementExplorerPage() {
  const [filters, setFilters] = useState<Filters>({});

  const handleFilterChange = (filterType: 'category' | 'phase', value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value === "" ? undefined : value, // Set to undefined if "All" is selected
    }));
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  // Memoize elements data if it were to be fetched or processed
  const elements = useMemo(() => allElementsData, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          <section id="filters" aria-labelledby="filters-heading" className=' px-32'>
            <h2 id="filters-heading" className="sr-only">Element Filters</h2>
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </section>

          <section id="periodic-table" aria-labelledby="periodic-table-heading">
            <h2 id="periodic-table-heading" className="sr-only">Interactive Periodic Table</h2>
            <PeriodicTable elements={elements} filters={filters} />
          </section>

          <section id="ai-suggester" aria-labelledby="ai-suggester-heading" className="pt-8">
            <h2 id="ai-suggester-heading" className="sr-only">AI Element Suggester</h2>
            <AISuggestionTool />
          </section>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        Element Explorer - Powered by Next.js and AI.
      </footer>
    </div>
  );
}
