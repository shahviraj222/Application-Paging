import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(9);
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    domain: '',
    available: false
  });

  useEffect(() => {
    axios.get('/api/user')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (user) => {
    setEditUserId(user._id);
    setEditFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      domain: user.domain,
      available: user.available
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(editUserId, editFormData)
      const response = await axios.put(`/api/update-user?id=${editUserId}`, editFormData);
      console.log(response.data.message);
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === editUserId ? { ...user, ...editFormData } : user
        )
      );
      setEditUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error, perhaps by showing an alert or a message to the user
    }
  };

  const handleDelete = async (id) => {
    console.log(`Delete user with id: ${id}`);
    try {
      await axios.delete(`/api/delete-user?id=${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error, perhaps by showing an alert or a message to the user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-3xl text-rose-700 mb-4'>User Table</h1>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-300 block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
            <th className="bg-gray-200 p-2 text-gray-700 font-bold block md:table-cell">Avatar</th>
            <th className="bg-gray-200 p-2 text-gray-700 font-bold block md:table-cell">Name</th>
            <th className="bg-gray-200 p-2 text-gray-700 font-bold block md:table-cell">Email</th>
            <th className="bg-gray-200 p-2 text-gray-700 font-bold block md:table-cell">Domain</th>
            <th className="bg-gray-200 p-2 text-gray-700 font-bold block md:table-cell">Available</th>
            <th className="bg-gray-200 p-2 text-gray-700 font-bold block md:table-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {currentUsers.map(user => (
            <tr key={user._id} className="bg-white border border-gray-300 block md:table-row">
              <td className="p-2 block md:table-cell">
                <img src={user.avatar} alt={user.first_name} className="rounded-full w-12 h-12" />
              </td>
              <td className="p-2 block md:table-cell">{user.first_name} {user.last_name}</td>
              <td className="p-2 block md:table-cell">{user.email}</td>
              <td className="p-2 block md:table-cell">{user.domain}</td>
              <td className="p-2 block md:table-cell">{user.available ? 'Yes' : 'No'}</td>
              <td className="p-2 block md:table-cell">
                <button
                  onClick={() => handleEditClick(user)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editUserId && (
        <form onSubmit={handleUpdateSubmit} className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-bold mb-2">Edit User</h2>
          <label className="block mb-2">
            First Name:
            <input
              type="text"
              name="first_name"
              value={editFormData.first_name}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Last Name:
            <input
              type="text"
              name="last_name"
              value={editFormData.last_name}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Domain:
            <input
              type="text"
              name="domain"
              value={editFormData.domain}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Available:
            <input
              type="checkbox"
              name="available"
              checked={editFormData.available}
              onChange={handleInputChange}
              className="ml-2"
            />
          </label>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setEditUserId(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-rose-700 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
