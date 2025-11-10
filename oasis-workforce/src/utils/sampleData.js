export const sampleWorkers = [
  {
    id: '1',
    name: 'Juan dela Cruz',
    position: 'Senior Construction Worker',
    category: 'Construction',
    nationality: 'Filipino',
    experience: 8,
    availability: 'Immediate',
    email: 'juan.delacruz@example.com',
    phone: '+64 21 XXX XXXX',
    description: 'Experienced construction worker with expertise in residential and commercial building projects. Proficient in various construction techniques and safety protocols.',
    skills: ['Carpentry', 'Concrete Work', 'Scaffolding', 'Blueprint Reading', 'Safety Management'],
    languages: ['English', 'Filipino', 'Tagalog'],
    certifications: ['Site Safe Passport', 'Scaffold User Certificate', 'First Aid Level 2'],
    rating: 4.8,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    position: 'Registered Nurse',
    category: 'Healthcare',
    nationality: 'Indian',
    experience: 5,
    availability: 'Within 2 weeks',
    email: 'priya.sharma@example.com',
    phone: '+64 21 XXX XXXX',
    description: 'Compassionate and skilled registered nurse with experience in acute care settings. Strong clinical skills and patient-centered care approach.',
    skills: ['Patient Care', 'Medication Administration', 'Emergency Response', 'Medical Records', 'Team Collaboration'],
    languages: ['English', 'Hindi', 'Punjabi'],
    certifications: ['Registered Nurse (NZ)', 'BLS Certification', 'ACLS'],
    rating: 4.9,
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '3',
    name: 'Wei Chen',
    position: 'Chef de Cuisine',
    category: 'Hospitality',
    nationality: 'Chinese',
    experience: 12,
    availability: 'Within 1 month',
    email: 'wei.chen@example.com',
    phone: '+64 21 XXX XXXX',
    description: 'Master chef with extensive experience in Asian and fusion cuisine. Proven track record in menu development and kitchen management.',
    skills: ['Chinese Cuisine', 'Menu Planning', 'Kitchen Management', 'Food Safety', 'Team Leadership'],
    languages: ['English', 'Mandarin', 'Cantonese'],
    certifications: ['Food Safety Certificate', 'HACCP Training', 'Advanced Culinary Diploma'],
    rating: 4.7,
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: '4',
    name: 'Somchai Phongsri',
    position: 'Horticulture Specialist',
    category: 'Agriculture',
    nationality: 'Thai',
    experience: 6,
    availability: 'Immediate',
    email: 'somchai.p@example.com',
    phone: '+64 21 XXX XXXX',
    description: 'Skilled horticulture specialist with expertise in organic farming and greenhouse management. Passionate about sustainable agriculture practices.',
    skills: ['Organic Farming', 'Greenhouse Management', 'Pest Control', 'Irrigation Systems', 'Crop Planning'],
    languages: ['English', 'Thai'],
    certifications: ['Growsafe Certificate', 'Organic Production Training', 'Forklift License'],
    rating: 4.6,
    createdAt: '2024-02-10T10:00:00Z'
  },
  {
    id: '5',
    name: 'Maria Santos',
    position: 'Hospitality Manager',
    category: 'Hospitality',
    nationality: 'Filipino',
    experience: 10,
    availability: 'Negotiable',
    email: 'maria.santos@example.com',
    phone: '+64 21 XXX XXXX',
    description: 'Experienced hospitality manager with strong leadership and customer service skills. Proven ability to manage operations and exceed guest expectations.',
    skills: ['Hotel Management', 'Customer Service', 'Staff Training', 'Budgeting', 'Quality Control'],
    languages: ['English', 'Filipino'],
    certifications: ['Hospitality Management Diploma', 'Food & Beverage Service', 'RSA Certificate'],
    rating: 4.9,
    createdAt: '2024-02-15T10:00:00Z'
  },
  {
    id: '6',
    name: 'Rajesh Kumar',
    position: 'Software Developer',
    category: 'IT & Technology',
    nationality: 'Indian',
    experience: 7,
    availability: 'Within 2 weeks',
    email: 'rajesh.kumar@example.com',
    phone: '+64 21 XXX XXXX',
    description: 'Full-stack developer with expertise in modern web technologies and cloud computing. Strong problem-solving skills and experience in agile environments.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
    languages: ['English', 'Hindi', 'Tamil'],
    certifications: ['AWS Certified Developer', 'Scrum Master Certification', 'Computer Science Degree'],
    rating: 4.8,
    createdAt: '2024-02-20T10:00:00Z'
  }
];

// Initialize localStorage with sample data if empty
export const initializeSampleData = () => {
  const existingData = localStorage.getItem('workers_data');
  if (!existingData || JSON.parse(existingData).length === 0) {
    localStorage.setItem('workers_data', JSON.stringify(sampleWorkers));
    return true;
  }
  return false;
};
