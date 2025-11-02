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
    id: 'punya',
    name: 'Punya Mishra',
    position: 'Advisor',
    image: '/staff/punya.png',
    websiteUrl: 'https://punyamishra.com/',
    description: 'Punya Mishra is Director of Innovative Learning Futures at the Learning Engineering Institute (LEI) and Professor in the Mary Lou Fulton College for Teaching & Learning Innovation at Arizona State University (with an affiliate appointment in the Design School).\n\nHe is internationally recognized for his work in educational technology; the role of creativity and aesthetics in learning; and the application of collaborative, design-based approaches to educational innovation. He has received over $11 million in grants; published over 200 articles and edited 5 books. A recipient of AECT\'s David H. Jonassen Excellence in Research Award, with over 72,000 citations of his research, he is ranked among the top 2% of scientists worldwide (#91 in social science) and ranked #62 (#11 in psychology) among educational scholars with the biggest influence on educational practice and policy.\n\nPunya has extensive leadership experience in higher education, having previously served as Associate Dean of Scholarship & Innovation (at MLFTC), where he led a range of initiatives that provided a future-forward, equity driven, approach to inter/trans-disciplinary educational research. He has also served as director of doctoral programs (at MLFTC) and the award-winning Master of Arts in Educational Technology program (at Michigan State). He currently is a member of the steering committee of ASU\'s Leadership Academy, AACTE\'s Technology and Innovation Committee, and editor-in-residence for the Journal of Teacher Education.\n\nAn AERA Fellow (2024), TED-Ed educator (2023), he co-hosts the award-winning Silver Lining for Learning webinar as well as the Learning Futures podcast. He is an award-winning instructor, an engaging public speaker, and an accomplished visual artist and poet.'
  },
  {
    id: 'shiven',
    name: 'Shiven Shekar',
    position: 'President',
    image: '/staff/shiven.png',
    linkedinUrl: 'https://www.linkedin.com/in/shiven-shekar/',
    description: 'I\'m a senior studying Computer Science with a Software Engineering concentration at Arizona State University. My interests lie in AppliedML and Distributed Systems.'
  },
  {
    id: 'farnaz',
    name: 'Farnaz',
    position: 'Claude Builder Ambassador',
    image: '/staff/farnaz.png',
    linkedinUrl: 'https://www.linkedin.com/in/farnaz-avarzamani-a672069b/',
    description: 'Farnaz is a PhD candidate in Educational Policy and Evaluation at Arizona State University. Her research focuses on multilingual STEM education and generative AI to support teachers in diverse classrooms. Her work has earned multiple awards and publications. Through Principled Innovation®, she recently developed an AI tool for educators launching in mid-October.'
  },
  {
    id: 'tino',
    name: 'Tino Heather',
    position: 'Claude Ambassador',
    image: '/staff/tino.png',
    linkedinUrl: 'https://www.linkedin.com/in/heathermavunga/',
    description: 'Tino brings a global perspective to technology and policy, having studied across four continents. She holds a BA in Psychology and Management from Monash University and is pursuing a Master in Global Management at ASU\'s Thunderbird School, where she serves as a Claude AI Ambassador. She specializes in technology, people, and policy, focusing on AI, cybersecurity, and emerging technologies.'
  },
  {
    id: 'anjali',
    name: 'Anjali Kok',
    position: 'Vice President',
    image: '/staff/claude.svg',
  },
  {
    id: 'hieu',
    name: 'Hieu Than',
    position: 'Technology',
    image: '/staff/claude.svg',
  },
  {
    id: 'john',
    name: 'John Li',
    position: 'Technology',
    image: '/staff/john.png',
    description: "John Li is a Full Stack Developer, Honors Student at Arizona State University, and Technical Officer of the Claude Builder Club. With a passion for building robust applications and leading technical initiatives, John combines hands-on development expertise with community leadership. As a technical officer, he spearheads innovative projects and fosters a collaborative environment for club members to explore the latest in AI and software development.",
    linkedinUrl: 'https://www.linkedin.com/in/johnli05/',
    websiteUrl: 'https://tet.moe/',

  },
  {
    id: 'sebastian',
    name: 'Sebastian Abundis',
    position: 'Technology',
    image: '/staff/claude.svg',
  },
  {
    id: 'ekagra',
    name: 'Ekagra',
    position: 'Technology',
    image: '/staff/ekagra.png',
    websiteUrl: 'https://ekagragupta.com/',
    description: 'I\'m a senior studying Computer Science @ASU. Incoming intern @Google. My interest lies in Distributed Systems and Machine Learning.'
  },
  {
    id: 'ben',
    name: 'Ben Juntilla',
    position: 'Head of Operations',
    image: '/staff/claude.svg',
  },
  {
    id: 'sathwin',
    name: 'Sathwin Reddy',
    position: 'Operations + Finance',
    image: '/staff/claude.svg',
  },
  {
    id: 'anirudh',
    name: 'Anirudh Manjesh',
    position: 'Operations',
    image: '/staff/claude.svg',
  },
  {
    id: 'joana',
    name: 'Joana Choong',
    position: 'Community Outreach',
    image: '/staff/claude.svg',
  },
  {
    id: 'erick',
    name: 'Erick Li',
    position: 'Business + Finance',
    image: '/staff/claude.svg',
  }
];