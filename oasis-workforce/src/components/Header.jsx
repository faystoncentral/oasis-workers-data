import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <Building2 size={32} />
            <span className="logo-text">Oasis</span>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/admin/login" className="nav-link">Admin</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
