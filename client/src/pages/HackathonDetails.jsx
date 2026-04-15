import { useNavigate, useParams } from 'react-router';
import { images } from '../assets/assets';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Error404 from './Error404';
import { IoIosArrowBack } from 'react-icons/io';
import {
  IoLocationOutline,
  IoCalendarOutline,
  IoTrophyOutline,
  IoPeopleOutline,
  IoTimeOutline,
  IoGlobeOutline,
  IoRibbonOutline
} from 'react-icons/io5';
import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa';

export default function HackathonDetail() {
  const { id } = useParams();
  const { isLoggedIn, hackathon } = useContext(AppContext);
  const [hack, setHack] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [participants, setParticipants] = useState(0);
  const navigate = useNavigate();

  // Dummy data for enhancement
  const dummyData = {
    organizer: {
      name: 'TechInnovate Labs',
      logo: 'https://via.placeholder.com/50',
      verified: true
    },
    stats: {
      participants: 1247,
      teams: 89,
      countries: 23,
      submissions: 156
    },
    schedule: [
      { time: '09:00 AM', event: 'Opening Ceremony' },
      { time: '10:00 AM', event: 'Hacking Begins' },
      { time: '01:00 PM', event: 'Lunch Break' },
      { time: '06:00 PM', event: 'Mentorship Sessions' },
      { time: '09:00 PM', event: 'Mini Challenges' }
    ],
    judges: [
      { name: 'Dr. Sarah Chen', role: 'AI Research Lead at Google', avatar: '👩‍💼' },
      { name: 'Mark Rodriguez', role: 'CTO at TechStart', avatar: '👨‍💻' },
      { name: 'Emily Watson', role: 'Senior Developer at Microsoft', avatar: '👩‍💻' }
    ],
    sponsors: [
      { name: 'Google Cloud', tier: 'Platinum', logo: images.google },
      { name: 'Meta', tier: 'Gold', logo: images.facebook },
      { name: 'AWS', tier: 'Silver' },
      { name: 'MongoDB', tier: 'Bronze' }
    ],
    tracks: [
      { name: 'AI/ML', icon: '🤖', color: 'from-blue-500 to-purple-500' },
      { name: 'Web3', icon: '⛓️', color: 'from-orange-500 to-red-500' },
      { name: 'Mobile', icon: '📱', color: 'from-green-500 to-teal-500' },
      { name: 'Open Innovation', icon: '💡', color: 'from-yellow-500 to-orange-500' }
    ],
    prizes: {
      first: '$10,000',
      second: '$5,000',
      third: '$2,500',
      category: ['Best UI/UX', 'Most Innovative', 'Best Social Impact']
    }
  };

  useEffect(() => {
    const foundHack = hackathon.find(
      (hack) => hack._id.toString() === id.toString()
    );

    // Enhance found hack with dummy data
    if (foundHack) {
      setHack({
        ...foundHack,
        ...dummyData
      });

      // Simulate participant count
      setParticipants(Math.floor(Math.random() * 500) + 800);

      // Calculate time left
      const calculateTimeLeft = () => {
        const start = new Date(foundHack.startDate);
        const now = new Date();
        const diff = start - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          setTimeLeft(`${days}d ${hours}h remaining`);
        } else {
          setTimeLeft('Hackathon in progress');
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 60000);
      return () => clearInterval(timer);
    }
  }, [id, hackathon]);

  if (!hack) {
    return <Error404 />;
  }

  const isUpcoming = new Date(hack.startDate) > new Date();
  const statusColor = hack.status === 'active'
    ? 'bg-green-500'
    : hack.status === 'upcoming'
      ? 'bg-yellow-500'
      : 'bg-red-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-pink-600/90">
          <img
            src={images.HackDetail}
            alt="Hackathon Banner"
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>

        {/* Animated Background Particles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <button
            onClick={() => navigate('/hackathon')}
            className="absolute top-6 left-6 bg-white/10 backdrop-blur-md p-3 rounded-xl text-white font-semibold flex items-center gap-3 hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <IoIosArrowBack className="text-xl" />
            Back to Hackathons
          </button>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-2 ${statusColor} text-white text-sm font-bold rounded-full uppercase tracking-wider`}>
                {hack.status}
              </span>
              {isUpcoming && (
                <span className="px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full flex items-center gap-2">
                  <IoTimeOutline />
                  {timeLeft}
                </span>
              )}
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {hack.name}
            </h1>

            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              {hack.description}
            </p>

            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <IoLocationOutline className="text-2xl" />
                <span>{hack.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoCalendarOutline className="text-2xl" />
                <span>{new Date(hack.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {new Date(hack.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoPeopleOutline className="text-2xl" />
                <span>{participants}+ Participants</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <IoTrophyOutline className="text-4xl text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">${hack.prizes}</div>
                <div className="text-white/70 text-sm">Prize Pool</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <IoPeopleOutline className="text-4xl text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{dummyData.stats.teams}</div>
                <div className="text-white/70 text-sm">Teams</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <IoGlobeOutline className="text-4xl text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{dummyData.stats.countries}</div>
                <div className="text-white/70 text-sm">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                <IoRibbonOutline className="text-4xl text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{dummyData.stats.submissions}</div>
                <div className="text-white/70 text-sm">Submissions</div>
              </div>
            </div>

            {/* Tracks Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Hackathon Tracks</h2>
              <div className="grid grid-cols-2 gap-4">
                {dummyData.tracks.map((track, index) => (
                  <div key={index} className={`bg-gradient-to-r ${track.color} p-4 rounded-xl`}>
                    <div className="text-3xl mb-2">{track.icon}</div>
                    <div className="font-semibold text-white">{track.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Event Schedule</h2>
              <div className="space-y-3">
                {dummyData.schedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="text-purple-400 font-mono font-bold">{item.time}</div>
                    <div className="text-white">{item.event}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Judges */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Meet the Judges</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {dummyData.judges.map((judge, index) => (
                  <div key={index} className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="text-5xl mb-3">{judge.avatar}</div>
                    <div className="font-semibold text-white">{judge.name}</div>
                    <div className="text-white/60 text-sm">{judge.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Register Card */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white sticky top-6">
              <h3 className="text-2xl font-bold mb-4">Ready to Innovate?</h3>
              <p className="text-white/90 mb-6">
                Join {participants}+ hackers and build something amazing!
              </p>

              <button
                className={`w-full bg-white text-purple-600 py-4 px-6 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${hack.status === 'closed' && 'hidden'}`}
                onClick={() => {
                  if (isLoggedIn) {
                    navigate(`/contact`);
                  } else {
                    navigate('/login');
                  }
                }}
              >
                Register Now
              </button>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-sm text-white/80 mb-2">Share this event</div>
                <div className="flex gap-3">
                  <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <FaTwitter className="text-xl" />
                  </button>
                  <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <FaDiscord className="text-xl" />
                  </button>
                  <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <FaGithub className="text-xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* Prizes Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">🏆 Prizes</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-500/20 to-transparent rounded-lg">
                  <span className="text-white">🥇 1st Place</span>
                  <span className="text-yellow-400 font-bold">{dummyData.prizes.first}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-400/20 to-transparent rounded-lg">
                  <span className="text-white">🥈 2nd Place</span>
                  <span className="text-gray-300 font-bold">{dummyData.prizes.second}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-500/20 to-transparent rounded-lg">
                  <span className="text-white">🥉 3rd Place</span>
                  <span className="text-orange-400 font-bold">{dummyData.prizes.third}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="text-white/80 text-sm mb-2">Category Prizes</div>
                  {dummyData.prizes.category.map((cat, index) => (
                    <div key={index} className="text-white/90 text-sm py-1">• {cat}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sponsors */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Sponsored By</h3>
              <div className="space-y-4">
                {dummyData.sponsors.map((sponsor, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    {sponsor.logo ? (
                      <img src={sponsor.logo} alt={sponsor.name} className="w-8 h-8 object-contain" />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg"></div>
                    )}
                    <div className="flex-1">
                      <div className="text-white font-semibold">{sponsor.name}</div>
                      <div className="text-white/60 text-sm">{sponsor.tier} Sponsor</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}