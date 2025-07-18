import React, { useState } from 'react';

function AddUser({ onAddUser }) {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    setProfilePicture(e.target.value);
    setPreview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onAddUser({ name, profilePicture });
    setName('');
    setProfilePicture('');
    setPreview('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md bg-white rounded-xl shadow p-4 mb-4">
      <h2 className="text-lg font-bold text-blue-700 mb-2">Add User</h2>
      <input
        type="text"
        placeholder="Name"
        className="border rounded px-3 py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm text-blue-700">Profile Picture (choose one):</label>
        <input
          type="file"
          accept="image/*"
          className="border rounded px-3 py-2"
          onChange={handleFileChange}
        />
        <input
          type="url"
          placeholder="Profile Picture URL (optional)"
          className="border rounded px-3 py-2 mt-1"
          value={profilePicture.startsWith('data:') ? '' : profilePicture}
          onChange={handleUrlChange}
        />
      </div>
      {preview && (
        <img
          src={preview}
          alt="Profile Preview"
          className="w-16 h-16 rounded-full border-2 border-blue-300 mx-auto mt-2"
        />
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow mt-2">Add User</button>
    </form>
  );
}

export default AddUser; 