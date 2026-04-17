import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiCheckCircle } from 'react-icons/fi';

const Register = () => {
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success response
      setUserId('dummy_user_' + Date.now());
      toast.success('Registration successful! Sending OTP...');
      
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.info('Mock OTP: 123456');
      setStep(2);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Any 6 digit OTP is "valid" in this mock
      if (otp.length === 6) {
        toast.success('Email verified! You can now login.');
        navigate('/login');
      } else {
        toast.error('Invalid OTP. Hint: Use any 6 digits.');
      }
    } catch (error) {
      console.error('OTP error:', error);
      toast.error('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-[#1e293b] p-10 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm bg-opacity-80"
      >
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h2 className="text-center text-3xl font-extrabold text-white">Create Account</h2>
              <form className="mt-8 space-y-5" onSubmit={handleRegister}>
                <div className="space-y-4">
                  {/* Username Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      name="username"
                      type="text"
                      required
                      className="appearance-none rounded-lg relative block w-full pl-10 pr-4 py-3 border border-gray-700 bg-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all sm:text-sm"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      className="appearance-none rounded-lg relative block w-full pl-10 pr-4 py-3 border border-gray-700 bg-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all sm:text-sm"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      name="password"
                      type="password"
                      required
                      className="appearance-none rounded-lg relative block w-full pl-10 pr-4 py-3 border border-gray-700 bg-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all sm:text-sm"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Confirm Password Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCheckCircle className="text-gray-400" />
                    </div>
                    <input
                      name="confirmPassword"
                      type="password"
                      required
                      className={`appearance-none rounded-lg relative block w-full pl-10 pr-4 py-3 border ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500' : 'border-gray-700'} bg-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all sm:text-sm`}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-bold shadow-lg shadow-purple-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : 'Continue'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h2 className="text-center text-3xl font-extrabold text-white">Verify Email</h2>
              <p className="mt-2 text-center text-sm text-gray-400">Enter the OTP sent to {formData.email}</p>
              <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
                <input
                  type="text"
                  required
                  maxLength="6"
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 text-center text-2xl tracking-[1em] border border-gray-700 bg-[#334155] text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-bold"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button 
                   type="button"
                   onClick={() => setStep(1)}
                   className="w-full text-sm text-gray-400 hover:text-white transition-colors"
                >
                   Back to Registration
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <NavLink to="/login" title="login" className="font-medium text-purple-400 hover:text-purple-300">
              Sign in
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
