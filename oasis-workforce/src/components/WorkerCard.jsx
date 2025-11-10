import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, Star } from 'lucide-react';
import './WorkerCard.css';

const WorkerCard = ({ worker }) => {
  return (
    <Link to={`/worker/${worker.id}`} className="worker-card">
      <div className="worker-card-header">
        <div className="worker-avatar">
          {worker.photo ? (
            <img src={worker.photo} alt={worker.name} />
          ) : (
            <div className="avatar-placeholder">
              {worker.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}
        </div>
        <div className="worker-header-info">
          <h3 className="worker-name">{worker.name}</h3>
          <p className="worker-position">{worker.position}</p>
        </div>
      </div>

      <div className="worker-details">
        <div className="worker-detail-item">
          <MapPin size={16} />
          <span>{worker.nationality}</span>
        </div>
        <div className="worker-detail-item">
          <Briefcase size={16} />
          <span>{worker.experience} years experience</span>
        </div>
        <div className="worker-detail-item">
          <Calendar size={16} />
          <span>{worker.availability}</span>
        </div>
      </div>

      {worker.skills && worker.skills.length > 0 && (
        <div className="worker-skills">
          {worker.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
          {worker.skills.length > 3 && (
            <span className="skill-tag more">+{worker.skills.length - 3}</span>
          )}
        </div>
      )}

      {worker.rating && (
        <div className="worker-rating">
          <Star size={16} fill="#fbbf24" color="#fbbf24" />
          <span>{worker.rating.toFixed(1)}</span>
        </div>
      )}
    </Link>
  );
};

export default WorkerCard;
