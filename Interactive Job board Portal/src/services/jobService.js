// Simulated API response with comprehensive job listings
const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp',
    location: {
      city: 'San Francisco',
      country: 'USA',
      coordinates: [37.7749, -122.4194],
    },
    description: 'Looking for an experienced React developer to lead our frontend team. Must have 5+ years of experience with React and modern JavaScript.',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    postedAt: '2024-03-10',
    requirements: ['5+ years React experience', 'TypeScript', 'REST APIs', 'Team leadership'],
    benefits: ['Health insurance', '401(k) matching', 'Remote work options', 'Annual learning budget']
  },
  {
    id: '2',
    title: 'Frontend Engineer',
    company: 'StartupX',
    location: {
      city: 'New York',
      country: 'USA',
      coordinates: [40.7128, -74.0060],
    },
    description: 'Join our fast-growing startup and help build the future of fintech. Looking for a passionate frontend developer.',
    salary: '$100,000 - $130,000',
    type: 'Full-time',
    postedAt: '2024-03-09',
    requirements: ['3+ years frontend experience', 'Vue.js or React', 'CSS/SASS'],
    benefits: ['Equity package', 'Flexible hours', 'Weekly team events']
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'DesignLab',
    location: {
      city: 'London',
      country: 'UK',
      coordinates: [51.5074, -0.1278],
    },
    description: 'Creative UI/UX designer needed for our digital agency. Work on exciting projects for global clients.',
    salary: '£45,000 - £60,000',
    type: 'Full-time',
    postedAt: '2024-03-08',
    requirements: ['Figma expertise', 'Portfolio required', 'User research experience'],
    benefits: ['Healthcare', '25 days holiday', 'Learning budget']
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: {
      city: 'Seattle',
      country: 'USA',
      coordinates: [47.6062, -122.3321],
    },
    description: 'Looking for a DevOps engineer to help scale our cloud infrastructure and implement CI/CD pipelines.',
    salary: '$130,000 - $160,000',
    type: 'Full-time',
    postedAt: '2024-03-07',
    requirements: ['AWS/Azure experience', 'Kubernetes', 'Terraform', 'CI/CD'],
    benefits: ['Full benefits package', 'Remote work', 'Professional development']
  },
  {
    id: '5',
    title: 'Backend Developer',
    company: 'DataCo',
    location: {
      city: 'Berlin',
      country: 'Germany',
      coordinates: [52.5200, 13.4050],
    },
    description: 'Backend developer needed for our data processing platform. Focus on scalability and performance.',
    salary: '€65,000 - €85,000',
    type: 'Full-time',
    postedAt: '2024-03-06',
    requirements: ['Python', 'PostgreSQL', 'Redis', 'API design'],
    benefits: ['30 days vacation', 'Health insurance', 'Gym membership']
  },
  {
    id: '6',
    title: 'Mobile Developer',
    company: 'AppWorks',
    location: {
      city: 'Toronto',
      country: 'Canada',
      coordinates: [43.6532, -79.3832],
    },
    description: 'Experienced mobile developer needed for cross-platform app development using React Native.',
    salary: 'CAD 90,000 - 120,000',
    type: 'Full-time',
    postedAt: '2024-03-05',
    requirements: ['React Native', 'iOS/Android', 'API integration'],
    benefits: ['Health benefits', 'Stock options', 'Flexible hours']
  },
  {
    id: '7',
    title: 'Data Scientist',
    company: 'AILabs',
    location: {
      city: 'Boston',
      country: 'USA',
      coordinates: [42.3601, -71.0589],
    },
    description: 'Join our AI research team working on cutting-edge machine learning projects.',
    salary: '$140,000 - $180,000',
    type: 'Full-time',
    postedAt: '2024-03-04',
    requirements: ['PhD in ML/AI', 'PyTorch/TensorFlow', 'Research experience'],
    benefits: ['Research budget', 'Conference attendance', 'Publication support']
  },
  {
    id: '8',
    title: 'Technical Writer',
    company: 'DocuTech',
    location: {
      city: 'Amsterdam',
      country: 'Netherlands',
      coordinates: [52.3676, 4.9041],
    },
    description: 'Create technical documentation and tutorials for our developer platform.',
    salary: '€45,000 - €60,000',
    type: 'Part-time',
    postedAt: '2024-03-03',
    requirements: ['Technical writing experience', 'Developer documentation', 'English fluency'],
    benefits: ['Flexible schedule', 'Remote work', 'Healthcare']
  },
  {
    id: '9',
    title: 'QA Engineer',
    company: 'TestPro',
    location: {
      city: 'Singapore',
      country: 'Singapore',
      coordinates: [1.3521, 103.8198],
    },
    description: 'Lead QA engineer needed to develop and maintain automated test suites.',
    salary: 'SGD 80,000 - 100,000',
    type: 'Full-time',
    postedAt: '2024-03-02',
    requirements: ['Selenium', 'Jest', 'CI/CD pipelines', 'Test automation'],
    benefits: ['Annual bonus', 'Health insurance', 'Professional certifications']
  },
  {
    id: '10',
    title: 'Blockchain Developer',
    company: 'CryptoTech',
    location: {
      city: 'Dubai',
      country: 'UAE',
      coordinates: [25.2048, 55.2708],
    },
    description: 'Develop smart contracts and blockchain solutions for our fintech platform.',
    salary: '$110,000 - $140,000',
    type: 'Contract',
    postedAt: '2024-03-01',
    requirements: ['Solidity', 'Web3.js', 'Smart contracts', 'DeFi experience'],
    benefits: ['Performance bonus', 'Crypto payments option', 'Flexible location']
  }
];

export const searchJobs = async (query, filters) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockJobs.filter((job) => {
    const matchesQuery = !query || 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.description.toLowerCase().includes(query.toLowerCase());
    
    const matchesLocation = !filters.location || 
      job.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
      job.location.country.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesType = !filters.type || job.type === filters.type;
    
    return matchesQuery && matchesLocation && matchesType;
  });
};