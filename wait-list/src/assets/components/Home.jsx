import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Product from '../images/product.webp';
import Image from '../images/userhome4.jpg';
import { FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

export const Home = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [name, setName] = useState('');
  const [rank, setRank] = useState('');
  const [link, setLink] = useState('');
  const [mail, setMail] = useState('');
  const [contestClosed, setContestClosed] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRank(user.rank);
      setLink(user.referralcode);
      setMail(user.email);
      checkContestStatus();
    }
  }, [user]);

  const checkContestStatus = async () => {
    try {
      const response = await fetch('http://localhost:3000/contest-status');
      const data = await response.json();
      if (data.status === 'closed') {
        setContestClosed(true);
      }
    } catch (error) {
      console.error('Error checking contest status:', error);
    }
  };

  return (
    <div>
      <h1 className='bg-black text-white p-5 text-xl text-center'>Wait Wave</h1>
      {user && (!contestClosed || user.rank === 1) && (
        <div className='h-[90vh] bg-cover bg-center' style={{ backgroundImage: `url(${Image})` }}>
          <h2 className="bg-slate-200 text-xl p-4 font-semibold flex justify-between items-center">
            <span>Welcome {name}</span>
            <p className="text-sm lowercase flex items-center space-x-1">
              <span>{mail}</span>
              <FaEnvelope />
              <button>
                <Link to='/login' className='text-red-500 text-xl '><FaSignOutAlt/></Link>
              </button>
            </p>
          </h2>
          <div className='mt-20 xl:w-[60%] w-[90%] shadow-md shadow-gray-100 mx-auto rounded-xl flex items-center justify-center my-auto space-x-5 backdrop-blur-xl text-md'>
            <img src={Product} width={300} height={300} alt="Product" />
            <div className='flex flex-col space-y-4 font-mono text-gray-50 text-xl'>
              <span className='py-2'>
                Your Current Rank: <br /><br />
                <span className='text-xl p-2 rounded-md font-semibold bg-gray-900'>{rank}</span>
              </span>
              <span>
                Your Referral Code: <br /><br />
                <span className='text-xl p-2 rounded-md font-semibold bg-gray-900'>{link}</span>
              </span> <br />
              <div className="text-sm mr-1 p-2 rounded-md bg-gray-900">
                {rank === 1 ? (
                  <>
                    <p className="font-bold">Congratulations!</p>
                    <p>As the top-ranked user, a coupon code has been sent to your email. Enjoy your new product!</p>
                  </>
                ) : (
                  <>
                    <p className="font-bold">Increase Your Rank to Win!</p>
                    <p>To increase your chances of winning the iPhone, refer more friends and climb up the leaderboard.</p>
                  </>
                )}
              </div>
              <p></p>
            </div>
          </div>
        </div>
      )}
      {contestClosed && rank !== 1 && (
        <div className='h-[90vh] bg-cover bg-center flex items-center justify-center' style={{ backgroundImage: `url(${Image})` }}>
          <div className='p-10 rounded-lg shadow-lg backdrop-blur-md shadow-black w-[60%] lg:w-[40%] text-center bg-slate-200'>
            <h2 className='text-2xl font-bold mb-4'>Sorry, the contest is now closed.</h2>
            <p>Thank you for your interest. The contest has ended, and no more entries will be accepted.</p>
          </div>
        </div>
      )}
    </div>
  );
};
