import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3001/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h2>
      <p className="mb-4">This is your dashboard. You can add more features and content here.</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;