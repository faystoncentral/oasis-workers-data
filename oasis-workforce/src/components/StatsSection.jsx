import { TrendingUp, Users, Award } from 'lucide-react';
import './StatsSection.css';

const StatsSection = () => {
  const stats = [
    {
      icon: <TrendingUp size={32} />,
      value: '21',
      label: 'Years of Experience',
      suffix: '+'
    },
    {
      icon: <Users size={32} />,
      value: '9,252',
      label: 'Successful Placements',
      suffix: ''
    },
    {
      icon: <Award size={32} />,
      value: '#1',
      label: 'Brand Satisfaction',
      suffix: ''
    }
  ];

  return (
    <div className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">
              {stat.value}{stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
