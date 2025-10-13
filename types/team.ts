export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  description?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'shiven',
    name: 'Shiven',
    position: 'President',
    image: '/shiven.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/shiven-shekar/',
    description: 'I\'m a senior studying Computer Science with a Software Engineering concentration at Arizona State University. My interests lie in AppliedML and Distributed Systems.'
  },
  {
    id: 'tino',
    name: 'Tino',
    position: 'Claude Ambassador',
    image: '/tino.jpeg',
    linkedinUrl: 'https://www.linkedin.com/in/heathermavunga/',
    description: 'Tino brings a global perspective to technology and policy, having studied across four continents. She holds a BA in Psychology and Management from Monash University and is pursuing a Master in Global Management at ASU\'s Thunderbird School, where she serves as a Claude AI Ambassador. She specializes in technology, people, and policy, focusing on AI, cybersecurity, and emerging technologies.'
  },
  {
    id: 'farnaz',
    name: 'Farnaz',
    position: 'Claude Builder Ambassador',
    image: '/farnaz.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/farnaz-avarzamani-a672069b/',
    description: 'Farnaz is a PhD candidate in Educational Policy and Evaluation at Arizona State University\'s Mary Lou Fulton College for Teaching and Learning Innovation. Her doctoral research combines multilingual STEM education, curriculum policy, and generative AI to enhance teaching practices. She develops AI-driven solutions that support teachers in diverse classrooms, efforts that have been recognized through multiple awards, publications, and invited talks. Her most recent AI project, conducted through Principled Innovation®, has led to the development of an AI tool that will be launched in mid-October.'
  },
  {
    id: 'anjali',
    name: 'Anjali',
    position: 'Technology',
    image: '/claude.svg',
  },
  {
    id: 'sathwin',
    name: 'Sathwin',
    position: 'Operations + Finance',
    image: '/claude.svg',
  },
  {
    id: 'ben',
    name: 'Ben',
    position: 'Head of Operations',
    image: '/claude.svg',
  },
  {
    id: 'erick',
    name: 'Erick',
    position: 'Business + Finance Outreach',
    image: '/claude.svg',
  },
  {
    id: 'hieu',
    name: 'Hieu',
    position: 'Technology',
    image: '/claude.svg',
  },
  {
    id: 'joana',
    name: 'Joana',
    position: 'Community Outreach',
    image: '/claude.svg',
  },
  {
    id: 'john',
    name: 'John',
    position: 'Technology',
    image: '/claude.svg',
  },
  {
    id: 'sebastian',
    name: 'Sebastian',
    position: 'Technology',
    image: '/claude.svg',
  },
  {
    id: 'ekagra',
    name: 'Ekagra',
    position: 'Technology',
    image: '/ekagra.jpeg',
    websiteUrl: 'https://ekagragupta.com/',
    description: 'I\'m a senior studying Computer Science @ASU. Incoming intern @Google. My interest lies in Distributed Systems and Machine Learning.'
  }
];
