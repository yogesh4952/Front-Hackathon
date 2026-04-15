import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AppContext = createContext();

const DUMMY_HACKATHONS = [
  {
    _id: 'dummy1',
    name: 'AI Innovation Hub 2024',
    startDate: '2024-06-15T09:00:00.000Z',
    endDate: '2024-06-17T18:00:00.000Z',
    location: 'San Francisco, CA',
    status: 'open',
    description: 'Join the brightest minds in AI to build the future of intelligent systems. This 48-hour hackathon brings together developers, designers, and entrepreneurs to create groundbreaking AI solutions.',
    prizes: '25,000',
    maxTeamSize: 4,
    mode: 'Hybrid',
    website: 'https://ai-innovation-hub.dev',
    requirements: ['AI/ML experience', 'Laptop', 'Passion for innovation'],
    perks: ['Free Cloud Credits', 'Mentorship Sessions', 'Networking Opportunities']
  },
  {
    _id: 'dummy2',
    name: 'Sustainable Tech Challenge',
    startDate: '2024-07-20T10:00:00.000Z',
    endDate: '2024-07-22T20:00:00.000Z',
    location: 'London, UK',
    status: 'upcoming',
    description: 'Solve real-world environmental problems using green technology. From carbon footprint trackers to waste management solutions - build tech that makes our planet better.',
    prizes: '15,000',
    maxTeamSize: 5,
    mode: 'In-Person',
    website: 'https://sustainable-tech.dev',
    requirements: ['Interest in sustainability', 'Development skills', 'Creative mindset'],
    perks: ['Eco-friendly Swag', 'Plant a Tree per Participant', 'Green Tech Workshops']
  },
  {
    _id: 'dummy3',
    name: 'Web3 Builders Summit',
    startDate: '2024-05-10T08:00:00.000Z',
    endDate: '2024-05-12T16:00:00.000Z',
    location: 'Berlin, Germany',
    status: 'closed',
    description: 'The ultimate gathering for decentralized application developers. Build the next generation of dApps, DeFi protocols, and NFT platforms.',
    prizes: '50,000',
    maxTeamSize: 4,
    mode: 'Hybrid',
    website: 'https://web3-summit.dev',
    requirements: ['Blockchain knowledge', 'Smart contract experience', 'Web3.js familiarity'],
    perks: ['Crypto Rewards', 'VC Office Hours', 'Launchpad Opportunities']
  },
  {
    _id: 'dummy4',
    name: 'Global Fintech Hackathon',
    startDate: '2024-08-05T09:00:00.000Z',
    endDate: '2024-08-07T18:00:00.000Z',
    location: 'Singapore',
    status: 'open',
    description: 'Revolutionize the banking industry with disruptive fintech solutions. Create the next big thing in payments, lending, or personal finance management.',
    prizes: '30,000',
    maxTeamSize: 4,
    mode: 'In-Person',
    website: 'https://fintech-hack.dev',
    requirements: ['Fintech interest', 'Full-stack development', 'Security awareness'],
    perks: ['Banking API Access', 'Financial Experts Mentorship', 'Job Opportunities']
  },
  {
    _id: 'dummy5',
    name: 'Cyber Security Shield',
    startDate: '2024-09-12T10:00:00.000Z',
    endDate: '2024-09-14T22:00:00.000Z',
    location: 'New York, USA',
    status: 'upcoming',
    description: 'A deep dive into the latest cybersecurity threats and defense mechanisms. Participate in CTF challenges and build security tools that protect digital assets.',
    prizes: '20,000',
    maxTeamSize: 3,
    mode: 'Hybrid',
    website: 'https://cyber-shield.dev',
    requirements: ['Security fundamentals', 'CTF experience', 'Problem-solving skills'],
    perks: ['Bug Bounty Opportunities', 'Security Tools License', 'Industry Certifications']
  },
  {
    _id: 'dummy6',
    name: 'Green Earth Hack 2024',
    startDate: '2024-06-25T09:00:00.000Z',
    endDate: '2024-06-27T17:00:00.000Z',
    location: 'Tokyo, Japan',
    status: 'open',
    description: 'Creating innovative solutions for a cleaner and greener planet. Focus areas include renewable energy, sustainable agriculture, and ocean cleanup technologies.',
    prizes: '18,000',
    maxTeamSize: 5,
    mode: 'Virtual',
    website: 'https://green-earth-hack.dev',
    requirements: ['Environmental passion', 'Tech skills', 'Global perspective'],
    perks: ['Carbon Credits', 'Sustainability Certification', 'Research Partnerships']
  },
  {
    _id: 'dummy7',
    name: 'Cloud Native Expo 2023',
    startDate: '2023-11-15T08:00:00.000Z',
    endDate: '2023-11-17T19:00:00.000Z',
    location: 'Austin, TX',
    status: 'closed',
    description: 'Exploring the future of cloud computing and containerization. Build scalable applications using Kubernetes, serverless, and microservices architecture.',
    prizes: '40,000',
    maxTeamSize: 4,
    mode: 'Hybrid',
    website: 'https://cloud-native-expo.dev',
    requirements: ['Cloud experience', 'Containerization knowledge', 'DevOps mindset'],
    perks: ['Cloud Credits', 'Certification Vouchers', 'Enterprise Tools Access']
  },
  {
    _id: 'dummy8',
    name: 'Game Jam: Retro Revival',
    startDate: '2024-10-05T12:00:00.000Z',
    endDate: '2024-10-07T12:00:00.000Z',
    location: 'Stockholm, Sweden',
    status: 'upcoming',
    description: 'Build modern games with a classic retro twist in this 48-hour jam. Create games inspired by 8-bit and 16-bit era masterpieces using modern game engines.',
    prizes: '12,000',
    maxTeamSize: 6,
    mode: 'Virtual',
    website: 'https://retro-game-jam.dev',
    requirements: ['Game development skills', 'Creativity', 'Team collaboration'],
    perks: ['Game Engine Licenses', 'Asset Store Credits', 'Publishing Opportunities']
  },
  {
    _id: 'dummy9',
    name: 'Data Science Sprint',
    startDate: '2024-06-10T09:00:00.000Z',
    endDate: '2024-06-12T20:00:00.000Z',
    location: 'Remote',
    status: 'open',
    description: 'Solving complex problems through data visualization and machine learning. Work with real-world datasets to uncover insights and build predictive models.',
    prizes: '22,000',
    maxTeamSize: 3,
    mode: 'Virtual',
    website: 'https://data-science-sprint.dev',
    requirements: ['Data analysis skills', 'Python/R knowledge', 'Statistical thinking'],
    perks: ['Dataset Access', 'ML Model Credits', 'Research Publication']
  },
  {
    _id: 'dummy10',
    name: 'Mobile App Masterclass',
    startDate: '2023-09-20T10:00:00.000Z',
    endDate: '2023-09-22T18:00:00.000Z',
    location: 'Bangalore, India',
    status: 'closed',
    description: 'Workshop and hackathon focused on building high-performance mobile apps. Learn from industry experts and build cross-platform applications using React Native and Flutter.',
    prizes: '28,000',
    maxTeamSize: 4,
    mode: 'In-Person',
    website: 'https://mobile-masterclass.dev',
    requirements: ['Mobile development basics', 'UI/UX interest', 'Fast learner'],
    perks: ['App Store Publishing', 'Design Resources', 'Mentorship Program']
  }
];

const AppContextProvider = ({ children }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Hackathon State
  const [hackathon, setHackathon] = useState([]);
  const [closedHackathons, setClosedHackathons] = useState([]);
  const [upcomingHackathons, setUpcomingHackathons] = useState([]);
  const [openHackathons, setOpenHackathons] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalLikes, setTotalLikes] = useState({
    like1: 0,
    like2: 0,
    like3: 0,
    like4: 0,
    like5: 0,
  });
  const [totalDislikes, setTotalDislikes] = useState({
    dislike1: 0,
    dislike2: 0,
    dislike3: 0,
    dislike4: 0,
    dislike5: 0,
  });

  // Initialize Auth
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      // Set a dummy user if one doesn't exist but we have a token
      if (!user) {
        setUser({
          _id: 'dummy_user_123',
          username: 'DemoUser',
          email: 'demo@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser'
        });
      }
    } else {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem('likes'));
    const dislikes = JSON.parse(localStorage.getItem('dislikes'));

    if (likes && dislikes) {
      setTotalLikes(likes);
      setTotalDislikes(dislikes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(totalLikes));
    localStorage.setItem('dislikes', JSON.stringify(totalDislikes));
  }, [totalLikes, totalDislikes]);

  // Consolidated Hackathon Filtering
  useEffect(() => {
    setClosedHackathons(hackathon.filter((data) => data.status === 'closed'));
    setUpcomingHackathons(hackathon.filter((data) => data.status === 'upcoming'));
    setOpenHackathons(hackathon.filter((data) => data.status === 'open'));
  }, [hackathon]);

  const fetchHackathon = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setHackathon(DUMMY_HACKATHONS);
    } catch (error) {
      console.error('Error fetching hackathon', error);
      toast.error('Failed to fetch hackathon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHackathon();
  }, []);

  // Add a function to get a single hackathon by ID
  const getHackathonById = (id) => {
    return hackathon.find(hack => hack._id.toString() === id.toString());
  };

  const value = {
    BACKEND_URL,
    hackathon,
    setHackathon,
    closedHackathons,
    openHackathons,
    upcomingHackathons,
    loading,
    setLoading,
    totalLikes,
    totalDislikes,
    setTotalLikes,
    setTotalDislikes,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    token,
    setToken,
    fetchHackathon,
    getHackathonById
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContextProvider, AppContext };