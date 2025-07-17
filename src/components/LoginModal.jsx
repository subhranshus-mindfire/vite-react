import React, { useState } from 'react';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-6">Login</h2>

        <p className="text-sm text-blue-600 mb-6 cursor-pointer hover:underline">
          Register for free
        </p>

        <label className="block text-sm font-semibold mb-1">
          Email ID / Username
        </label>
        <input
          type="text"
          placeholder="Enter your active Email ID / Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-sm font-semibold mb-1">Password</label>
        <div className="relative mb-2">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 hover:underline"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <p className="text-sm text-blue-600 mb-6 cursor-pointer hover:underline">
          Forgot Password?
        </p>

        <button className="w-full bg-blue-600 text-white rounded-full py-2 hover:bg-blue-700">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
