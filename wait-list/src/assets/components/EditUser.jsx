import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Image from '../images/background.jpg';
import axios from 'axios';

export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    axios.get(`http://localhost:3000/adminhome/edituser/${id}`)
      .then(res => {
        console.log(res.data)
        setName(res.data.name)
        setEmail(res.data.email)
      })
      .catch(err => console.log(err));
  }, [id]);

  const Handle = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/adminhome/edituser/${id}`, { email, name })
      .then(res => {
        console.log(res);
        navigate('/adminhome');
      })
      .catch(err => {
        console.log(err);
        setError(err.message || 'An error occurred');
      });
  };
    return (
    <div className='flex justify-center items-center h-screen bg-cover bg-center' style={{ backgroundImage: `url(${Image})` }}>
      <div className="p-10 rounded-lg shadow-lg backdrop-blur-md shadow-black w-[60%] lg:w-[40%]">
        <h1 className='text-3xl text-center font-semibold'>Edit User</h1>
        <form className="space-y-4" onSubmit={Handle}>
          <label htmlFor="email" className='font-semibold'>Email</label><br />
          <input
            type="email"
            id="email"
            name='email'
            value={email}
            placeholder='Enter email'
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <label htmlFor="name" className='font-semibold'>Name</label><br />
          <input
            type="text"
            id="name"
            name='name'
            value={name}
            placeholder='Enter name'
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            onChange={(e) => setName(e.target.value)}
            required
          /><br />
          {error && <p className='text-red-500 text-center'>{error}</p>}
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-gray-700">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
