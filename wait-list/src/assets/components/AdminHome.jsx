import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios'; 
import Image from '../images/adminhome.jpg';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';

export const AdminHome = () => {
  const location = useLocation();
  const [users, setUsers] = useState(location.state?.users || []); 
  
  useEffect(() => {
    axios.get('http://localhost:3000/adminhome/users')
      .then(res => {
        console.log('Fetched users:', res.data);
        setUsers(res.data);
      })
      .catch(err => {
        console.log('Error fetching users:', err);
      });
  }, []);

  const handleDelete = (id) => {
    const res = window.confirm("Confirm to delete");
    if (res) {
      axios.delete(`http://localhost:3000/adminhome/deleteuser/${id}`)
        .then(response => {
          console.log('User deleted:', response.data);
          setUsers(users.filter(user => user._id !== id));
          alert("Deleted");
        })
        .catch(error => {
          console.log('Error deleting user:', error);
          alert("Not Deleted");
        });
    } else {
      alert("Not Deleted");
    }
  };

  return (
    <div>
      <h1 className='bg-black p-5 text-xl text-white text-center'>Wait Wave</h1>
      <div className='min-h-[90vh] bg-cover bg-center' style={{ backgroundImage: `url(${Image})` }}>
        <h2 className='bg-slate-200 text-xl p-4 text-center font-semibold'>Leaderboard</h2>
        <button className='p-2 bg-white text-black  rounded m-2 ml-[70%] hover:bg-black hover:text-white'>
          <Link to='/adduser' className='flex'>
            Add User <FaPlus className='p-0.5 my-auto'/>
          </Link>
        </button>
        <div className='mt-4 xl:w-[60%] w-[90%] mx-auto rounded-xl flex items-center justify-center space-x-5 text-md'>
          {users.length > 0 ? (
            <table className="min-w-full border mb-6 border-gray-200 rounded-md bg-white text-center shadow-lg">
              <thead className="bg-gray-50">
                <tr className="text-xl font-semibold text-gray-700">
                  <th className="px-6 py-3 border-b border-gray-200">Rank</th>
                  <th className="px-6 py-3 border-b border-gray-200">Name</th>
                  <th className="px-6 py-3 border-b border-gray-200">Email</th>
                  <th className="px-6 py-3 border-b border-gray-200">Delete</th>
                  <th className="px-6 py-3 border-b border-gray-200">Edit</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr key={index} className="bg-transparent backdrop-blur-xl text-black hover:bg-gray-400 hover:text-black transition-colors">
                    <td className="px-6 py-4 border-b border-gray-200">{item.rank}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{item.name}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{item.email}</td>
                    <td className="px-6 py-4 border-b border-gray-200 text-red-700">
                      <button 
                        onClick={() => handleDelete(item._id)} 
                        className="hover:text-red-500 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-black">
                      <Link to={`edituser/${item._id}`} className="text-gray-950 hover:text-gray-50 transition-colors">
                        <FaEdit />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-xl text-gray-700 mt-10">
              No users available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
