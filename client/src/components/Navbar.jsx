import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AppContext } from '../context/AppContext';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn, user, setToken, setIsLoggedIn, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <nav className='bg-gray-900 text-white sticky w-full z-10 top-0 shadow-lg'>
      <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-10'>
        <div className='flex justify-between items-center h-16'>
          <NavLink
            to='/'
            className='text-white text-3xl font-semibold flex items-center space-x-2'
          >
            <span className='text-purple-500 text-4xl'>CODINg</span>
            <span className='text-2xl'>Heroes</span>
          </NavLink>

          {/* Main Navigation Links */}
          <div className='hidden md:flex space-x-6'>
            {[
              'Home',
              'Hackathon',
              'Projects',
              'Guides',
              'Mentors',
              'About',
            ].map((link) => (
              <NavLink
                key={link}
                to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                className={({ isActive }) =>
                  `${
                    isActive ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-300'
                  } text-lg px-2 py-1 transition-all duration-300 hover:text-white
                   ${link === 'Projects' && !isLoggedIn ? 'cursor-not-allowed opacity-50' : ''}`
                }
              >
                {link}
              </NavLink>
            ))}
          </div>

          {/* Authentication or Logout Button */}
          <div className='flex items-center gap-4'>
            {isLoggedIn ? (
              <div className='relative'>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className='flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-full transition-all duration-300'
                >
                  <FaUserCircle className="text-2xl text-purple-500" />
                  <span className='hidden sm:block text-sm font-medium'>{user?.username || 'User'}</span>
                </button>
                
                {showDropdown && (
                  <div className='absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-xl py-2 border border-gray-700 z-50'>
                    <div className='px-4 py-2 border-b border-gray-700 mb-2'>
                        <p className='text-xs text-gray-400'>Signed in as</p>
                        <p className='text-sm font-semibold truncate'>{user?.email || 'user@example.com'}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex gap-4'>
                <NavLink
                  to='/login'
                  className='px-6 py-2 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition duration-300 hover:scale-105 active:scale-95 shadow-md font-semibold text-sm'
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden text-white focus:outline-none'
          >
            {isOpen ? <FaTimes className='w-6 h-6' /> : <FaBars className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-gray-800 text-white flex flex-col items-center py-4 space-y-4 border-t border-gray-700'>
          {['Home', 'Hackathon', 'Projects', 'Guides', 'Mentors', 'About'].map(
            (link) => (
              <NavLink
                key={link}
                to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                className='block text-lg px-6 py-2 text-gray-300 hover:bg-gray-700 rounded-md w-full text-center transition-all duration-300'
                onClick={() => setIsOpen(false)}
              >
                {link}
              </NavLink>
            )
          )}
          {!isLoggedIn && (
             <NavLink
             to='/login'
             className='w-[80%] mx-auto py-2 text-center text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-300'
             onClick={() => setIsOpen(false)}
           >
             Login
           </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
