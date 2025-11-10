# Oasis Workforce Management System

A comprehensive workforce management system for Oasis Immigration Group, New Zealand's premier workforce solutions provider.

## Features

### Public Website
- **Worker Directory**: Browse and search through available workforce
- **Advanced Search & Filtering**: Filter by category, nationality, experience, and availability
- **Detailed Worker Profiles**: View complete worker information including skills, certifications, and ratings
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Admin Dashboard
- **Secure Login**: Admin authentication system (default: admin/admin123)
- **CRUD Operations**: Add, edit, and delete worker records
- **GitHub Integration**: Automatic synchronization with GitHub repository for data backup and version control
- **Real-time Updates**: Changes immediately reflected on the public website

## Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router v6
- **UI Components**: Custom components with Lucide React icons
- **State Management**: React Context API
- **Data Storage**: 
  - Primary: GitHub repository (when configured)
  - Fallback: Browser localStorage
- **Styling**: Custom CSS with responsive design

## Installation

1. Extract the zip file
2. Navigate to the project directory:
   ```bash
   cd oasis-workforce
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit: `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready to deploy to any static hosting service.

## GitHub Integration Setup

1. Login to the Admin Dashboard
2. Click "Configure GitHub" button
3. Enter your GitHub details:
   - **Repository Owner**: Your GitHub username
   - **Repository Name**: The repository to store worker data
   - **Personal Access Token**: Generate at https://github.com/settings/tokens
     - Required scope: `repo`
   - **Data File**: workers.json (default)
   - **Branch**: main (default)

4. Click "Save Configuration"

Once configured, all worker data changes (add, edit, delete) will automatically sync with your GitHub repository.

## Admin Access

- **URL**: `/admin/login`
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin123`

⚠️ **Important**: Change these credentials in production by modifying `src/contexts/AuthContext.jsx`

## Project Structure

```
oasis-workforce/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── WorkerCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── StatsSection.jsx
│   │   ├── WorkerForm.jsx
│   │   └── GitHubConfigModal.jsx
│   ├── pages/           # Page components
│   │   ├── HomePage.jsx
│   │   ├── WorkerDetail.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── services/        # API and data services
│   │   ├── workerService.js
│   │   └── githubService.js
│   ├── contexts/        # React contexts
│   │   └── AuthContext.jsx
│   ├── utils/           # Utility functions
│   │   └── sampleData.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html          # HTML template
└── package.json        # Dependencies
```

## Features in Detail

### Worker Management
- Add new workers with comprehensive information
- Update existing worker profiles
- Delete workers with confirmation
- Upload worker photos (URL-based)
- Track skills, certifications, and languages

### Search & Filter
- Text search across names, positions, skills, and nationalities
- Filter by category (Construction, Hospitality, Healthcare, etc.)
- Filter by nationality
- Filter by minimum experience
- Filter by availability

### Data Persistence
- **Primary Storage**: GitHub repository (when configured)
- **Fallback Storage**: Browser localStorage
- **Automatic Sync**: Changes sync to GitHub automatically
- **Data Format**: JSON structure for easy management

## Security Notes

- GitHub tokens are stored in browser localStorage
- Never commit tokens to version control
- Use environment variables for production deployments
- Implement proper authentication in production
- Set up repository access controls on GitHub

## Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Mobile browsers: ✅ Responsive design

## Support

For issues or questions, please contact: info@oasisworkforce4u.com

## License

Copyright © 2024 Oasis Immigration Group. All rights reserved.
