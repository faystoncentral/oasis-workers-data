import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './WorkerForm.css';

const WorkerForm = ({ worker, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    category: '',
    nationality: '',
    experience: '',
    availability: '',
    email: '',
    phone: '',
    description: '',
    photo: '',
    skills: '',
    languages: '',
    certifications: '',
    rating: ''
  });

  useEffect(() => {
    if (worker) {
      setFormData({
        name: worker.name || '',
        position: worker.position || '',
        category: worker.category || '',
        nationality: worker.nationality || '',
        experience: worker.experience || '',
        availability: worker.availability || '',
        email: worker.email || '',
        phone: worker.phone || '',
        description: worker.description || '',
        photo: worker.photo || '',
        skills: worker.skills?.join(', ') || '',
        languages: worker.languages?.join(', ') || '',
        certifications: worker.certifications?.join(', ') || '',
        rating: worker.rating || ''
      });
    }
  }, [worker]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.position || !formData.nationality) {
      alert('Please fill in all required fields (Name, Position, Nationality)');
      return;
    }

    // Process data
    const processedData = {
      ...formData,
      experience: parseInt(formData.experience) || 0,
      rating: parseFloat(formData.rating) || null,
      skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : [],
      languages: formData.languages ? formData.languages.split(',').map(l => l.trim()).filter(l => l) : [],
      certifications: formData.certifications ? formData.certifications.split(',').map(c => c.trim()).filter(c => c) : []
    };

    onSave(processedData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{worker ? 'Edit Worker' : 'Add New Worker'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="worker-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                className="input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position *</label>
              <input
                id="position"
                name="position"
                type="text"
                className="input"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                className="input"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="Construction">Construction</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="IT & Technology">IT & Technology</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="nationality">Nationality *</label>
              <select
                id="nationality"
                name="nationality"
                className="input"
                value={formData.nationality}
                onChange={handleChange}
                required
              >
                <option value="">Select Nationality</option>
                <option value="Filipino">Filipino</option>
                <option value="Indian">Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Thai">Thai</option>
                <option value="Vietnamese">Vietnamese</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Malaysian">Malaysian</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="experience">Experience (years)</label>
              <input
                id="experience"
                name="experience"
                type="number"
                min="0"
                className="input"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="availability">Availability</label>
              <select
                id="availability"
                name="availability"
                className="input"
                value={formData.availability}
                onChange={handleChange}
              >
                <option value="">Select Availability</option>
                <option value="Immediate">Immediate</option>
                <option value="Within 2 weeks">Within 2 weeks</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="Negotiable">Negotiable</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="input"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating (0-5)</label>
              <input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                className="input"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="photo">Photo URL</label>
              <input
                id="photo"
                name="photo"
                type="url"
                className="input"
                placeholder="https://example.com/photo.jpg"
                value={formData.photo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="input textarea"
                rows="4"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="skills">Skills (comma-separated)</label>
              <input
                id="skills"
                name="skills"
                type="text"
                className="input"
                placeholder="e.g., Carpentry, Plumbing, Electrical"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="languages">Languages (comma-separated)</label>
              <input
                id="languages"
                name="languages"
                type="text"
                className="input"
                placeholder="e.g., English, Filipino, Chinese"
                value={formData.languages}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="certifications">Certifications (comma-separated)</label>
              <input
                id="certifications"
                name="certifications"
                type="text"
                className="input"
                placeholder="e.g., Safety Training, First Aid, License"
                value={formData.certifications}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {worker ? 'Update Worker' : 'Add Worker'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkerForm;
