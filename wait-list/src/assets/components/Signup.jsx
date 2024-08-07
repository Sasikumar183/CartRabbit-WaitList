import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../images/background.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralcode, setReferralcode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/register', { name, email, password, referralcode })
      .then(res => {
        console.log(res);
        navigate('/home', { state: { user: res.data } });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='flex justify-center items-center h-screen bg-cover bg-center' style={{ backgroundImage: `url(${Image})` }}>
      <div className="p-10 rounded-lg shadow-lg backdrop-blur-md shadow-black w-[60%] lg:w-[40%]">
        <h1 className='text-3xl text-center font-semibold'>Signup</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="email" className='font-semibold'>Email</label><br />
          <input type="email" placeholder='Enter your email' name='email' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" onChange={(e) => setEmail(e.target.value)} required /><br />
          <label htmlFor="name" className='font-semibold'>Name</label><br />
          <input type="text" name='name' placeholder='Enter your name' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" onChange={(e) => setName(e.target.value)} required /><br />
          <label htmlFor="password" className='font-semibold'>Password</label><br />
          <input type="password" name='password' placeholder='Enter your password' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" onChange={(e) => setPassword(e.target.value)} required /><br />
          <label htmlFor="referralcode" className='font-semibold'>Referral Code</label><br />
          <input type="text" name='referralcode' placeholder='Enter referral code (if any)' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" onChange={(e) => setReferralcode(e.target.value)} /><br />
          <p className='text-center'>Already have an account? <Link to='/login' className='font-semibold hover:underline'>Sign-in</Link></p>
          <button type='submit' className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-800">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
