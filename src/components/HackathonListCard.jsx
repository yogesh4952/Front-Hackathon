import { FaXTwitter } from 'react-icons/fa6';
import { IoLogoGithub } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const HackathonListCard = ({ hackathon }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AppContext);

  return (
    <div className='border border-gray-800 bg-gray-900 rounded-xl shadow-lg p-6 hover:border-purple-500/50 transition-all duration-300'>
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
        <div>
          <h2 className='text-2xl font-bold text-white mb-1'>
            {hackathon.name}
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <p className='text-gray-400 text-sm font-medium uppercase tracking-wider'>Hackathon</p>
          </div>
        </div>

        {/* Social Links */}
        <div className='flex gap-3 mt-4 sm:mt-0'>
          <div className='w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white cursor-pointer transition-all border border-gray-700'>
            <FaXTwitter className='text-lg' />
          </div>

          <div className='w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white cursor-pointer transition-all border border-gray-700'>
            <IoLogoGithub className='text-lg' />
          </div>
        </div>
      </div>

      {/* Theme Section */}
      <div className='flex flex-col sm:flex-row justify-between gap-6 mb-6 items-end'>
        <div className="flex-1">
          <h3 className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-2'>Project Theme</h3>
          <p className='text-white bg-gray-800 border border-gray-700 py-3 px-4 rounded-xl font-medium'>
            {hackathon.theme || 'Open Innovation'}
          </p>
        </div>

        <div className='mt-4 sm:mt-0 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700'>
          <p className='text-gray-300 text-sm font-semibold'><span className="text-white">+250</span> participants</p>
        </div>
      </div>

      {/* Location, Status, and Start Date */}
      <div className='flex flex-col sm:flex-row flex-wrap gap-3 items-center justify-between mt-8 border-t border-gray-800 pt-6'>
        <div className='flex flex-wrap gap-2'>
          <div className='bg-gray-800 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-md border border-gray-700 uppercase tracking-wider'>
            {hackathon.location || 'Online'}
          </div>
          <div className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider border ${
            hackathon.status === 'open' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
            hackathon.status === 'upcoming' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
            'bg-red-500/10 text-red-500 border-red-500/20'
          }`}>
            {hackathon.status}
          </div>
          <div className='bg-gray-800 text-gray-300 text-xs font-bold px-3 py-1.5 rounded-md border border-gray-700 uppercase tracking-wider'>
            STARTS {new Date(hackathon.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}
          </div>
        </div>

        {/* Button Section */}
        <div className='grow sm:grow-0 w-full sm:w-auto flex gap-3'>
          <button
            onClick={() => navigate(`/hackathon/${hackathon._id}`)}
            className='flex-1 sm:flex-none text-white py-2.5 px-6 rounded-xl font-bold text-sm bg-gray-800 hover:bg-gray-700 transition-all border border-gray-700 cursor-pointer'
          >
            Details
          </button>

          <button
            onClick={() => {
              if (!isLoggedIn) {
                navigate('/login');
              } else {
                navigate(`/contact`);
              }
            }}
            className={`flex-1 sm:flex-none bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-6 rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-900/20 cursor-pointer ${hackathon.status === 'closed' ? 'hidden' : ''}`}
          >
            {hackathon.status === 'open'
              ? 'Join Now'
              : hackathon.status === 'upcoming'
              ? 'Register'
              : 'View'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HackathonListCard;
