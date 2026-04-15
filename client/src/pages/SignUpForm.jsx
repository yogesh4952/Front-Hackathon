// src/components/SignUpForm.js

import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router';
import {
  IoPeopleOutline,
  IoMailOutline,
  IoCallOutline,
  IoTrophyOutline,
  IoRocketOutline,
  IoCheckmarkCircleOutline,
  IoArrowBack
} from 'react-icons/io5';
import { FaUserAstronaut, FaCode, FaPaintBrush, FaDatabase } from 'react-icons/fa';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const hackathonId = searchParams.get('hackathon');
  const hackathonName = searchParams.get('name');

  const [formData, setFormData] = useState({
    hackathonId: hackathonId || '',
    hackathonName: hackathonName || '',
    teamName: '',
    teamEmail: '',
    members: [
      { name: '', role: 'Developer', email: '' },
      { name: '', role: 'Developer', email: '' },
      { name: '', role: 'Developer', email: '' },
      { name: '', role: 'Developer', email: '' }
    ],
    phoneNumber: '',
    eventType: 'Online',
    projectIdea: '',
    githubUrl: '',
    agreeToTerms: false
  });

  const { hackathon } = useContext(AppContext);
  const navigate = useNavigate();

  const roles = [
    { value: 'Developer', icon: FaCode, color: 'text-blue-400' },
    { value: 'Designer', icon: FaPaintBrush, color: 'text-pink-400' },
    { value: 'Data Scientist', icon: FaDatabase, color: 'text-green-400' },
    { value: 'Product Manager', icon: FaUserAstronaut, color: 'text-purple-400' }
  ];

  const eventTypes = ['Online', 'In-Person', 'Hybrid'];

  // Auto-fill hackathon name if ID is provided
  useEffect(() => {
    if (hackathonId && hackathon.length > 0) {
      const selectedHackathon = hackathon.find(h => h._id === hackathonId);
      if (selectedHackathon) {
        setFormData(prev => ({
          ...prev,
          hackathonId: selectedHackathon._id,
          hackathonName: selectedHackathon.name
        }));
      }
    }
  }, [hackathonId, hackathon]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle member changes
  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index][field] = value;
    setFormData({ ...formData, members: updatedMembers });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.teamName.trim()) {
      toast.error('Team name is required');
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    const validMembers = formData.members.filter(m => m.name.trim() !== '');
    if (validMembers.length === 0) {
      toast.error('At least one team member is required');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success animation
      toast.success('🚀 Team registered successfully! Check your email for confirmation.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form
      setFormData({
        hackathonId: '',
        hackathonName: '',
        teamName: '',
        teamEmail: '',
        members: [
          { name: '', role: 'Developer', email: '' },
          { name: '', role: 'Developer', email: '' },
          { name: '', role: 'Developer', email: '' },
          { name: '', role: 'Developer', email: '' }
        ],
        phoneNumber: '',
        eventType: 'Online',
        projectIdea: '',
        githubUrl: '',
        agreeToTerms: false
      });

      // Navigate to confirmation or dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error registering team', error);
      toast.error('Failed to register team. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-white/10 backdrop-blur-md p-3 rounded-xl text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition-all duration-300 border border-white/20"
        >
          <IoArrowBack className="text-xl" />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
            <IoRocketOutline className="text-xl" />
            Limited Spots Available
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join the Hackathon
          </h1>
          <p className="text-white/70 text-lg">
            Register your team and start building something amazing
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Hackathon Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  <IoTrophyOutline className="inline mr-2" />
                  Select Hackathon
                </label>
                <select
                  name="hackathonId"
                  value={formData.hackathonId}
                  onChange={(e) => {
                    const selected = hackathon.find(h => h._id === e.target.value);
                    setFormData({
                      ...formData,
                      hackathonId: e.target.value,
                      hackathonName: selected ? selected.name : ''
                    });
                  }}
                  required
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="" className="bg-gray-800">Select a hackathon</option>
                  {hackathon.filter(h => h.status !== 'closed').map((hack) => (
                    <option key={hack._id} value={hack._id} className="bg-gray-800">
                      {hack.name} ({hack.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  <IoPeopleOutline className="inline mr-2" />
                  Team Name
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="e.g., Code Warriors"
                  required
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Team Email & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  <IoMailOutline className="inline mr-2" />
                  Team Email
                </label>
                <input
                  type="email"
                  name="teamEmail"
                  value={formData.teamEmail}
                  onChange={handleChange}
                  placeholder="team@example.com"
                  required
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  <IoCallOutline className="inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Team Members */}
            <div>
              <label className="block text-white font-semibold mb-4 text-lg">
                Team Members (Max 4)
              </label>
              <div className="space-y-4">
                {formData.members.map((member, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-1">
                          Member {index + 1} {index === 0 ? '(Team Lead)' : ''}
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                          placeholder="Full Name"
                          required={index === 0}
                          className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Email</label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                          placeholder="member@example.com"
                          required={index === 0}
                          className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Role</label>
                        <div className="flex gap-2">
                          {roles.map((role) => (
                            <button
                              key={role.value}
                              type="button"
                              onClick={() => handleMemberChange(index, 'role', role.value)}
                              className={`flex-1 p-2 rounded-lg border transition-all duration-200 ${member.role === role.value
                                ? 'bg-purple-500 border-purple-400 text-white'
                                : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
                                }`}
                              title={role.value}
                            >
                              <role.icon className={`mx-auto ${member.role === role.value ? 'text-white' : role.color}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Idea */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Project Idea (Optional)
              </label>
              <textarea
                name="projectIdea"
                value={formData.projectIdea}
                onChange={handleChange}
                placeholder="Briefly describe what you plan to build..."
                rows="3"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            {/* GitHub URL & Event Type */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  GitHub/Portfolio URL (Optional)
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/yourteam"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Participation Mode
                </label>
                <div className="flex gap-3">
                  {eventTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, eventType: type })}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${formData.eventType === type
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border-t border-white/20 pt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
                />
                <span className="text-white/80 text-sm">
                  I agree to the{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                    Terms and Conditions
                  </a>
                  ,{' '}
                  <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                    Code of Conduct
                  </a>
                  , and confirm that all team members meet the eligibility requirements.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white py-4 px-6 rounded-xl font-bold text-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </>
                ) : (
                  <>
                    <IoRocketOutline className="text-2xl group-hover:animate-bounce" />
                    Complete Registration
                    <IoCheckmarkCircleOutline className="text-2xl" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Trust Indicators */}
            <div className="flex justify-center gap-8 pt-4">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <IoCheckmarkCircleOutline className="text-green-400" />
                Secure Registration
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <IoCheckmarkCircleOutline className="text-green-400" />
                1000+ Teams Registered
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <IoCheckmarkCircleOutline className="text-green-400" />
                24/7 Support
              </div>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-white/50 text-sm">
          <p>By registering, you'll receive updates about the hackathon and important deadlines.</p>
          <p className="mt-2">
            Need help? Contact us at{' '}
            <a href="mailto:support@hackathon.com" className="text-purple-400 hover:text-purple-300">
              support@hackathon.com
            </a>
          </p>
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
};

export default SignUpForm;