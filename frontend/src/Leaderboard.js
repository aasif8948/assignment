import React from 'react';

function Leaderboard({ users }) {
  return (
    <div className="w-full max-w-md mt-6 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-yellow-700 mb-4">Leaderboard</h2>
      <ol className="divide-y divide-yellow-100">
        {users.map((user, idx) => (
          <li key={user.name} className="flex items-center py-2">
            <span className="text-yellow-700 font-bold w-6 text-center">{idx + 1}</span>
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-10 h-10 rounded-full mx-2 border-2 border-yellow-300"
            />
            <span className="flex-1 text-yellow-900">{user.name}</span>
            <span className="ml-4 text-yellow-600 font-semibold">{user.points} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard; 