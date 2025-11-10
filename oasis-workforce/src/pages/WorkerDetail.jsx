import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Calendar, Star, Mail, Phone } from 'lucide-react';
import { getWorkerById } from '../services/workerService';
import Header from '../components/Header';
import './WorkerDetail.css';

const WorkerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorker();
  }, [id]);

  const loadWorker = async () => {
    try {
      setLoading(true);
      const data = await getWorkerById(id);
      setWorker(data);
    } catch (error) {
      console.error('Error loading worker:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="worker-detail-page">
        <Header />
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="worker-detail-page">
        <Header />
        <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2>Worker not found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="worker-detail-page">
      <Header />
      
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="worker-detail-content">
          <div className="worker-profile-card">
            <div className="worker-profile-header">
              <div className="worker-profile-avatar">
                {worker.photo ? (
                  <img src={worker.photo} alt={worker.name} />
                ) : (
                  <div className="avatar-placeholder-large">
                    {worker.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                )}
              </div>
              <div className="worker-profile-info">
                <h1>{worker.name}</h1>
                <p className="profile-position">{worker.position}</p>
                {worker.rating && (
                  <div className="profile-rating">
                    <Star size={20} fill="#fbbf24" color="#fbbf24" />
                    <span>{worker.rating.toFixed(1)} Rating</span>
                  </div>
                )}
              </div>
            </div>

            <div className="worker-profile-details">
              <div className="detail-row">
                <MapPin size={20} />
                <div>
                  <strong>Nationality</strong>
                  <p>{worker.nationality}</p>
                </div>
              </div>
              <div className="detail-row">
                <Briefcase size={20} />
                <div>
                  <strong>Experience</strong>
                  <p>{worker.experience} years</p>
                </div>
              </div>
              <div className="detail-row">
                <Calendar size={20} />
                <div>
                  <strong>Availability</strong>
                  <p>{worker.availability}</p>
                </div>
              </div>
              {worker.email && (
                <div className="detail-row">
                  <Mail size={20} />
                  <div>
                    <strong>Email</strong>
                    <p>{worker.email}</p>
                  </div>
                </div>
              )}
              {worker.phone && (
                <div className="detail-row">
                  <Phone size={20} />
                  <div>
                    <strong>Phone</strong>
                    <p>{worker.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="worker-info-section">
            {worker.description && (
              <div className="info-card">
                <h2>About</h2>
                <p>{worker.description}</p>
              </div>
            )}

            {worker.skills && worker.skills.length > 0 && (
              <div className="info-card">
                <h2>Skills</h2>
                <div className="skills-list">
                  {worker.skills.map((skill, index) => (
                    <span key={index} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {worker.languages && worker.languages.length > 0 && (
              <div className="info-card">
                <h2>Languages</h2>
                <div className="languages-list">
                  {worker.languages.map((lang, index) => (
                    <span key={index} className="language-item">{lang}</span>
                  ))}
                </div>
              </div>
            )}

            {worker.certifications && worker.certifications.length > 0 && (
              <div className="info-card">
                <h2>Certifications</h2>
                <ul className="certifications-list">
                  {worker.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetail;
