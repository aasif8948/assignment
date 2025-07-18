import React, { useState } from 'react';

function ClaimPoints({ users, onClaim }) {
  const [selectedUser, setSelectedUser] = useState(users[0]?.name || '');

  const handleClaim = (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    onClaim(selectedUser);
  };

  return (
    <form onSubmit={handleClaim} className="flex flex-col gap-2 w-full max-w-md bg-white rounded-xl shadow p-4 mb-4">
      <h2 className="text-lg font-bold text-green-700 mb-2">Claim Points</h2>
      <select
        className="border rounded px-3 py-2"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        {users.map((user) => (
          <option key={user.name} value={user.name}>{user.name}</option>
        ))}
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded shadow mt-2">Claim Points</button>
    </form>
  );
}

export default ClaimPoints; 