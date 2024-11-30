import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { SearchSection } from './components/search/SearchSection';
import { JobSection } from './components/jobs/JobSection';
import { useJobSearch } from './hooks/useJobSearch';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);

  const { data: jobs = [], isLoading } = useJobSearch(searchQuery, filters);

  return (
    <div>
      <Header />
      <main className="main container">
        <SearchSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterChange={setFilters}
        />
        <JobSection
          jobs={jobs}
          isLoading={isLoading}
          selectedJob={selectedJob}
          onJobSelect={setSelectedJob}
        />
      </main>
    </div>
  );
}

export default App;