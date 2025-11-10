import { useState, useEffect } from 'react';
import { X, Github } from 'lucide-react';
import { getGitHubConfig } from '../services/githubService';
import './GitHubConfigModal.css';

const GitHubConfigModal = ({ onSave, onClose }) => {
  const [config, setConfig] = useState({
    owner: '',
    repo: '',
    token: '',
    dataFile: 'workers.json',
    branch: 'main'
  });

  useEffect(() => {
    const savedConfig = getGitHubConfig();
    if (savedConfig.owner) {
      setConfig(savedConfig);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!config.owner || !config.repo || !config.token) {
      alert('Please fill in all required fields');
      return;
    }

    onSave(config);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content github-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="github-header-title">
            <Github size={24} color="#2563eb" />
            <h2>GitHub Configuration</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="github-info">
          <p>
            Configure GitHub integration to automatically sync worker data with your repository.
            This enables version control and backup of your workforce data.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="github-form">
          <div className="form-group">
            <label htmlFor="owner">Repository Owner *</label>
            <input
              id="owner"
              name="owner"
              type="text"
              className="input"
              placeholder="e.g., yourusername"
              value={config.owner}
              onChange={handleChange}
              required
            />
            <small>Your GitHub username or organization name</small>
          </div>

          <div className="form-group">
            <label htmlFor="repo">Repository Name *</label>
            <input
              id="repo"
              name="repo"
              type="text"
              className="input"
              placeholder="e.g., workforce-data"
              value={config.repo}
              onChange={handleChange}
              required
            />
            <small>The name of your repository</small>
          </div>

          <div className="form-group">
            <label htmlFor="token">Personal Access Token *</label>
            <input
              id="token"
              name="token"
              type="password"
              className="input"
              placeholder="ghp_xxxxxxxxxxxx"
              value={config.token}
              onChange={handleChange}
              required
            />
            <small>
              Create a token at{' '}
              <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
                GitHub Settings
              </a>
              {' '}with 'repo' scope
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="dataFile">Data File Name</label>
            <input
              id="dataFile"
              name="dataFile"
              type="text"
              className="input"
              value={config.dataFile}
              onChange={handleChange}
            />
            <small>The JSON file name to store worker data (default: workers.json)</small>
          </div>

          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              name="branch"
              type="text"
              className="input"
              value={config.branch}
              onChange={handleChange}
            />
            <small>The branch to use (default: main)</small>
          </div>

          <div className="github-warning">
            <strong>⚠️ Security Note:</strong>
            <p>
              Your GitHub token will be stored in browser localStorage. Never share your token
              and ensure your repository has appropriate access controls.
            </p>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Github size={20} />
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GitHubConfigModal;
