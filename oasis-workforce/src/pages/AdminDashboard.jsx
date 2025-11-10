import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, Settings, Github } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAllWorkers, addWorker, updateWorker, deleteWorker } from '../services/workerService';
import { getGitHubConfig, saveGitHubConfig, isGitHubConfigured } from '../services/githubService';
import WorkerForm from '../components/WorkerForm';
import GitHubConfigModal from '../components/GitHubConfigModal';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [showGitHubConfig, setShowGitHubConfig] = useState(false);
  const [githubConfigured, setGithubConfigured] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadWorkers();
    setGithubConfigured(isGitHubConfigured());
  }, [isAuthenticated, navigate]);

  const loadWorkers = async () => {
    try {
      setLoading(true);
      const data = await getAllWorkers();
      setWorkers(data);
    } catch (error) {
      console.error('Error loading workers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWorker = async (workerData) => {
    try {
      await addWorker(workerData);
      await loadWorkers();
      setShowForm(false);
      alert('Worker added successfully!');
    } catch (error) {
      console.error('Error adding worker:', error);
      alert('Error adding worker');
    }
  };

  const handleUpdateWorker = async (workerData) => {
    try {
      await updateWorker(editingWorker.id, workerData);
      await loadWorkers();
      setShowForm(false);
      setEditingWorker(null);
      alert('Worker updated successfully!');
    } catch (error) {
      console.error('Error updating worker:', error);
      alert('Error updating worker');
    }
  };

  const handleDeleteWorker = async (id) => {
    if (!window.confirm('Are you sure you want to delete this worker?')) {
      return;
    }

    try {
      await deleteWorker(id);
      await loadWorkers();
      alert('Worker deleted successfully!');
    } catch (error) {
      console.error('Error deleting worker:', error);
      alert('Error deleting worker');
    }
  };

  const handleEdit = (worker) => {
    setEditingWorker(worker);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingWorker(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveGitHubConfig = (config) => {
    saveGitHubConfig(config);
    setGithubConfigured(isGitHubConfigured());
    setShowGitHubConfig(false);
    alert('GitHub configuration saved! Data will now sync with GitHub repository.');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <h1>Admin Dashboard</h1>
            <div className="admin-actions">
              <button 
                className={`btn ${githubConfigured ? 'btn-success' : 'btn-secondary'}`}
                onClick={() => setShowGitHubConfig(true)}
              >
                <Github size={20} />
                {githubConfigured ? 'GitHub Connected' : 'Configure GitHub'}
              </button>
              <button className="btn btn-secondary" onClick={handleLogout}>
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="dashboard-content">
          <div className="dashboard-toolbar">
            <h2>Workers Management</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              <Plus size={20} />
              Add New Worker
            </button>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : workers.length === 0 ? (
            <div className="empty-state">
              <p>No workers yet. Click "Add New Worker" to get started.</p>
            </div>
          ) : (
            <div className="workers-table-container">
              <table className="workers-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Nationality</th>
                    <th>Experience</th>
                    <th>Availability</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workers.map((worker) => (
                    <tr key={worker.id}>
                      <td>
                        <div className="worker-name-cell">
                          {worker.photo ? (
                            <img src={worker.photo} alt={worker.name} className="worker-thumb" />
                          ) : (
                            <div className="worker-thumb-placeholder">
                              {worker.name?.charAt(0)?.toUpperCase()}
                            </div>
                          )}
                          <span>{worker.name}</span>
                        </div>
                      </td>
                      <td>{worker.position}</td>
                      <td>{worker.nationality}</td>
                      <td>{worker.experience} years</td>
                      <td>
                        <span className="availability-badge">{worker.availability}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn edit-btn"
                            onClick={() => handleEdit(worker)}
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="action-btn delete-btn"
                            onClick={() => handleDeleteWorker(worker.id)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <WorkerForm
          worker={editingWorker}
          onSave={editingWorker ? handleUpdateWorker : handleAddWorker}
          onClose={handleCloseForm}
        />
      )}

      {showGitHubConfig && (
        <GitHubConfigModal
          onSave={handleSaveGitHubConfig}
          onClose={() => setShowGitHubConfig(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
