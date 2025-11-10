import { 
  fetchWorkersFromGitHub, 
  updateWorkersOnGitHub, 
  isGitHubConfigured 
} from './githubService';

// Local storage key
const LOCAL_STORAGE_KEY = 'workers_data';

// Get all workers
export const getAllWorkers = async () => {
  try {
    if (isGitHubConfigured()) {
      // Try to fetch from GitHub
      const workers = await fetchWorkersFromGitHub();
      // Cache in localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(workers));
      return workers;
    } else {
      // Fall back to localStorage
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
  } catch (error) {
    console.error('Error fetching workers:', error);
    // Fall back to localStorage
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
};

// Get worker by ID
export const getWorkerById = async (id) => {
  const workers = await getAllWorkers();
  return workers.find(worker => worker.id === id);
};

// Add new worker
export const addWorker = async (worker) => {
  const workers = await getAllWorkers();
  const newWorker = {
    ...worker,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  const updatedWorkers = [...workers, newWorker];
  
  // Save to localStorage first
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedWorkers));
  
  // Try to save to GitHub
  if (isGitHubConfigured()) {
    try {
      await updateWorkersOnGitHub(updatedWorkers);
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      // Continue with local storage only
    }
  }
  
  return newWorker;
};

// Update worker
export const updateWorker = async (id, updatedData) => {
  const workers = await getAllWorkers();
  const index = workers.findIndex(worker => worker.id === id);
  
  if (index === -1) {
    throw new Error('Worker not found');
  }
  
  workers[index] = {
    ...workers[index],
    ...updatedData,
    updatedAt: new Date().toISOString()
  };
  
  // Save to localStorage first
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(workers));
  
  // Try to save to GitHub
  if (isGitHubConfigured()) {
    try {
      await updateWorkersOnGitHub(workers);
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      // Continue with local storage only
    }
  }
  
  return workers[index];
};

// Delete worker
export const deleteWorker = async (id) => {
  const workers = await getAllWorkers();
  const updatedWorkers = workers.filter(worker => worker.id !== id);
  
  // Save to localStorage first
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedWorkers));
  
  // Try to save to GitHub
  if (isGitHubConfigured()) {
    try {
      await updateWorkersOnGitHub(updatedWorkers);
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      // Continue with local storage only
    }
  }
  
  return true;
};

// Search and filter workers
export const searchWorkers = async (query, filters = {}) => {
  const workers = await getAllWorkers();
  
  let filtered = workers;
  
  // Apply text search
  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(worker => 
      worker.name?.toLowerCase().includes(lowerQuery) ||
      worker.position?.toLowerCase().includes(lowerQuery) ||
      worker.skills?.some(skill => skill.toLowerCase().includes(lowerQuery)) ||
      worker.nationality?.toLowerCase().includes(lowerQuery)
    );
  }
  
  // Apply category filter
  if (filters.category) {
    filtered = filtered.filter(worker => worker.category === filters.category);
  }
  
  // Apply nationality filter
  if (filters.nationality) {
    filtered = filtered.filter(worker => worker.nationality === filters.nationality);
  }
  
  // Apply experience filter
  if (filters.minExperience) {
    filtered = filtered.filter(worker => 
      worker.experience >= parseInt(filters.minExperience)
    );
  }
  
  // Apply availability filter
  if (filters.availability) {
    filtered = filtered.filter(worker => worker.availability === filters.availability);
  }
  
  return filtered;
};
