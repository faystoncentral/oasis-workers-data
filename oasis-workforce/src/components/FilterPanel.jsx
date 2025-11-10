import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './FilterPanel.css';

const FilterPanel = ({ filters, onChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    'Construction',
    'Hospitality',
    'Healthcare',
    'Agriculture',
    'Manufacturing',
    'Retail',
    'IT & Technology',
    'Other'
  ];

  const nationalities = [
    'Filipino',
    'Indian',
    'Chinese',
    'Thai',
    'Vietnamese',
    'Indonesian',
    'Malaysian',
    'Other'
  ];

  const availabilities = [
    'Immediate',
    'Within 2 weeks',
    'Within 1 month',
    'Negotiable'
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...localFilters,
      [key]: value
    };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };

  const clearFilters = () => {
    setLocalFilters({});
    onChange({});
  };

  const hasActiveFilters = Object.keys(localFilters).length > 0;

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="filter-grid">
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            className="filter-select"
            value={localFilters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Nationality</label>
          <select
            className="filter-select"
            value={localFilters.nationality || ''}
            onChange={(e) => handleFilterChange('nationality', e.target.value)}
          >
            <option value="">All Nationalities</option>
            {nationalities.map((nat) => (
              <option key={nat} value={nat}>{nat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Min. Experience (years)</label>
          <input
            type="number"
            className="filter-input"
            placeholder="0"
            min="0"
            value={localFilters.minExperience || ''}
            onChange={(e) => handleFilterChange('minExperience', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Availability</label>
          <select
            className="filter-select"
            value={localFilters.availability || ''}
            onChange={(e) => handleFilterChange('availability', e.target.value)}
          >
            <option value="">All Availabilities</option>
            {availabilities.map((avail) => (
              <option key={avail} value={avail}>{avail}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
