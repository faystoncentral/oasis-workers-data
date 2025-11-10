# Oasis Workforce Website - Complete Backup
## Date: 2024-11-10
## Source: https://3019-idfdwc8z6nkjby2fx78m3-d0b9e1e2.sandbox.novita.ai/

---

## 📦 Backup Contents

### 1. Website Files
- **Location**: `3019-idfdwc8z6nkjby2fx78m3-d0b9e1e2.sandbox.novita.ai/`
- **Files**:
  - `index.html` (1.2KB) - Main HTML file
  - `assets/index-TW8RsbM8.js` (674KB) - React application bundle
  - `assets/index-MNiqDicW.css` (68KB) - Styles
  - `vite.svg` - Favicon
  - `robots.txt` - SEO configuration

### 2. Worker Database
- **File**: `workers-backup.txt`
- **Format**: JavaScript object array
- **Records**: 6 workers

#### Worker Records Summary:
1. **김철수 (Chul-soo Kim)** - Age 28, Male, Single
   - Category: Agriculture
   - Position: Farm Manager Assistant
   - Experience: 2020-2023 at Green Valley Farm
   - Education: Agricultural Technology Diploma

2. **이영희 (Young-hee Lee)** - Age 32, Female, Married
   - Category: Hospitality
   - Position: Restaurant Supervisor
   - Experience: 2019-2024 at Seoul Garden Restaurant
   - Education: Hospitality Management Degree

3. **박민수 (Min-soo Park)** - Age 25, Male, Single
   - Category: Construction
   - Position: Construction Worker
   - Experience: 2021-2024 at Seoul Construction Ltd
   - Education: Construction Technology Certificate

4. **최은지 (Eun-ji Choi)** - Age 29, Female, Single
   - Category: Healthcare
   - Position: Aged Care Assistant
   - Experience: 2020-2024 at Seoul Care Center
   - Education: Nursing Certificate

5. **정현우 (Hyun-woo Jung)** - Age 26, Male, Married
   - Category: Manufacturing
   - Position: Machine Operator
   - Experience: 2022-2024 at Samsung Manufacturing
   - Education: Mechanical Engineering Degree

6. **윤서연 (Seo-yeon Yoon)** - Age 24, Female, Single
   - Category: Administration
   - Position: Administrative Assistant
   - Experience: 2023-2024 at Global Trading Co.
   - Education: Business Administration Degree

---

## 📊 Data Fields

Each worker record includes:
- **Basic Info**: ID, Name (Korean & English), Gender, Age, Nationality
- **Personal**: Marital Status, Photo
- **Education**: Degree/Certificate details
- **Experience**: Work history with periods, positions, companies, descriptions
- **Certifications**: NZ Health & Safety, specialized certificates
- **Language**: English level, other languages
- **Status**: Visa status, current status, health/criminal checks
- **Requirements**: Desired salary, contract period
- **Categories**: Job categories, experience level
- **Skills**: Specific skills array

---

## 🔧 Technology Stack

- **Framework**: React (embedded in bundle)
- **Build Tool**: Vite
- **Bundle Size**: ~750KB total
- **Styling**: CSS modules

---

## 📝 Restoration Instructions

### Option 1: Deploy Static Files
```bash
# Extract the backup
unzip oasis-workforce-backup.zip

# Deploy the website files directory to your hosting
# Upload all files from: 3019-idfdwc8z6nkjby2fx78m3-d0b9e1e2.sandbox.novita.ai/
```

### Option 2: Import Worker Data
```javascript
// Use the workers-backup.txt file
// Copy the worker array and import into your application

// Example:
import { workers } from './workers-backup.txt';

// Or manually parse:
const workersData = [
  // Copy contents from workers-backup.txt
];
```

---

## 🔒 Backup Integrity

- **Files Downloaded**: 5
- **Total Size**: ~750KB
- **Data Records**: 6 workers
- **Backup Method**: wget mirror + manual data extraction
- **Verification**: ✅ All files intact, data extracted successfully

---

## 📧 Contact

- **Website**: oasisworkforce4u.com
- **Original Site**: https://3019-idfdwc8z6nkjby2fx78m3-d0b9e1e2.sandbox.novita.ai/

---

## ⚠️ Important Notes

1. The website is a React SPA (Single Page Application)
2. All worker data is embedded in the JavaScript bundle
3. No separate database file exists (data is hardcoded)
4. To modify worker data, you need to rebuild the React app
5. The backup includes the production build only

---

## 🔄 Next Steps

To create a new version with editable data:
1. Use the new oasis-workforce system (with admin dashboard)
2. Import these 6 workers into the new system
3. Enable GitHub sync for automatic backups
4. Deploy the new system to replace this static version

