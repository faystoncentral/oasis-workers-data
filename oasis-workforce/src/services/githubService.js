import axios from 'axios';

// GitHub Configuration
const GITHUB_CONFIG = {
  owner: '', // Will be set by admin
  repo: '', // Will be set by admin
  token: '', // Will be set by admin
  dataFile: 'workers.json',
  branch: 'main'
};

// Load GitHub config from localStorage
const loadConfig = () => {
  const savedConfig = localStorage.getItem('githubConfig');
  if (savedConfig) {
    const config = JSON.parse(savedConfig);
    Object.assign(GITHUB_CONFIG, config);
  }
};

// Save GitHub config to localStorage
export const saveGitHubConfig = (config) => {
  localStorage.setItem('githubConfig', JSON.stringify(config));
  Object.assign(GITHUB_CONFIG, config);
};

// Get GitHub config
export const getGitHubConfig = () => {
  loadConfig();
  return { ...GITHUB_CONFIG };
};

// Check if GitHub is configured
export const isGitHubConfigured = () => {
  loadConfig();
  return GITHUB_CONFIG.owner && GITHUB_CONFIG.repo && GITHUB_CONFIG.token;
};

// Fetch workers from GitHub
export const fetchWorkersFromGitHub = async () => {
  loadConfig();
  
  if (!isGitHubConfigured()) {
    throw new Error('GitHub is not configured');
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataFile}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${GITHUB_CONFIG.token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    // Decode base64 content
    const content = atob(response.data.content);
    return JSON.parse(content);
  } catch (error) {
    console.error('Error fetching workers from GitHub:', error);
    throw error;
  }
};

// Update workers on GitHub
export const updateWorkersOnGitHub = async (workers) => {
  loadConfig();
  
  if (!isGitHubConfigured()) {
    throw new Error('GitHub is not configured');
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataFile}`;
    
    // Get current file to get its SHA
    const currentFile = await axios.get(url, {
      headers: {
        Authorization: `token ${GITHUB_CONFIG.token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    // Update file
    const content = btoa(JSON.stringify(workers, null, 2));
    const response = await axios.put(
      url,
      {
        message: 'Update workers data',
        content: content,
        sha: currentFile.data.sha,
        branch: GITHUB_CONFIG.branch
      },
      {
        headers: {
          Authorization: `token ${GITHUB_CONFIG.token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating workers on GitHub:', error);
    throw error;
  }
};

// Create initial workers file on GitHub
export const createWorkersFileOnGitHub = async (workers = []) => {
  loadConfig();
  
  if (!isGitHubConfigured()) {
    throw new Error('GitHub is not configured');
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataFile}`;
    
    const content = btoa(JSON.stringify(workers, null, 2));
    const response = await axios.put(
      url,
      {
        message: 'Create workers data file',
        content: content,
        branch: GITHUB_CONFIG.branch
      },
      {
        headers: {
          Authorization: `token ${GITHUB_CONFIG.token}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating workers file on GitHub:', error);
    throw error;
  }
};
