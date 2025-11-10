import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Users, TrendingUp, Award, Calendar } from 'lucide-react';
import { getAllWorkers, searchWorkers } from '../services/workerService';
import Header from '../components/Header';
import WorkerCard from '../components/WorkerCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import StatsSection from '../components/StatsSection';
import './HomePage.css';

const HomePage = () => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadWorkers();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, filters]);

  const loadWorkers = async () => {
    try {
      setLoading(true);
      const data = await getAllWorkers();
      setWorkers(data);
      setFilteredWorkers(data);
    } catch (error) {
      console.error('Error loading workers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const results = await searchWorkers(searchQuery, filters);
      setFilteredWorkers(results);
    } catch (error) {
      console.error('Error searching workers:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="home-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              New Zealand's Premier <span className="highlight">Workforce Solutions</span>
            </h1>
            <p className="hero-subtitle">
              Oasis provides safe and reliable workforce solutions for New Zealand employers
            </p>
            <StatsSection />
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, position, skills, or nationality..."
            />
            <button 
              className="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              Filters
            </button>
          </div>
          
          {showFilters && (
            <FilterPanel 
              filters={filters}
              onChange={handleFilterChange}
            />
          )}
        </div>
      </section>

      {/* Workers Section */}
      <section className="workers-section">
        <div className="container">
          <div className="section-header">
            <h2>Available Workforce</h2>
            <p className="results-count">
              {filteredWorkers.length} {filteredWorkers.length === 1 ? 'worker' : 'workers'} found
            </p>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : filteredWorkers.length === 0 ? (
            <div className="no-results">
              <Users size={64} color="#94a3b8" />
              <h3>No workers found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="workers-grid">
              {filteredWorkers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Oasis Immigration Group</h3>
              <p>Your trusted partner in workforce solutions</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: info@oasisworkforce4u.com</p>
              <p>Phone: +64 (0)9 XXX XXXX</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link to="/admin/login" className="footer-link">Admin Login</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Oasis Immigration Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
