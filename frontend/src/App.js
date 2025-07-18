import React, { useState, useEffect } from 'react';
import Leaderboard from './Leaderboard';
import AddUser from './AddUser';
import ClaimPoints from './ClaimPoints';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/users`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setUsers([]);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Add user handler (API)
  const handleAddUser = async (user) => {
    try {
      const res = await fetch(`${backendUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        const newUser = await res.json();
        setUsers((prev) => [...prev, newUser]);
      }
    } catch (err) {}
  };

  // Claim points handler (API)
  const handleClaimPoints = async (userId) => {
    try {
      const res = await fetch(`${backendUrl}/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (res.ok) {
        const { user } = await res.json();
        setUsers((prev) =>
          prev.map((u) => (u._id === user._id ? user : u))
        );
      }
    } catch (err) {}
  };

  // Sort users by points descending for leaderboard
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-300 flex flex-col items-center p-2 sm:p-6">
      {/* Header */}
      <div className="w-full max-w-md flex justify-between items-center py-4">
        <h1 className="text-xl font-bold text-yellow-800">Wealth Ranking</h1>
        <button className="bg-yellow-400 text-white px-4 py-2 rounded shadow">Rewards</button>
      </div>

      {/* Add User and Claim Points Forms */}
      <AddUser onAddUser={handleAddUser} />
      <ClaimPoints users={sortedUsers} onClaim={handleClaimPoints} />

      {/* Leaderboard Component */}
      {loading ? (
        <div className="text-yellow-700 mt-6">Loading...</div>
      ) : (
        <Leaderboard users={sortedUsers} />
      )}
    </div>
  );
}

export default App;
