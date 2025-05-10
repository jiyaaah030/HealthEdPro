import React, { useState, useEffect } from 'react';
import { getPosts, getUsers } from '../api.js';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [postsData, usersData] = await Promise.all([
          getPosts(),
          getUsers()
        ]);

        setPosts(postsData || []);
        setUsers(usersData || []);
        setIsLoading(false);
      } catch  {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderPostsTable = () => (
    <table className="w-full border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Title</th>
          <th className="border p-2">Description</th>
          <th className="border p-2">Created Date</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post._id} className="hover:bg-gray-50">
            <td className="border p-2">{post.title}</td>
            <td className="border p-2">{post.description}</td>
            <td className="border p-2">{new Date(post.dataCreated).toLocaleDateString()}</td>
            <td className="border p-2">
              <div className="flex justify-center space-x-2">
                <button 
                  className="text-blue-500 hover:text-blue-700"
                  title="View"
                >
                  <FaEye />
                </button>
                <button 
                  className="text-green-500 hover:text-green-700"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button 
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderUsersTable = () => (
    <table className="w-full border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Join Date</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="hover:bg-gray-50">
            <td className="border p-2">{user.name}</td>
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">{new Date(user.joinDate).toLocaleDateString()}</td>
            <td className="border p-2">
              <div className="flex justify-center space-x-2">
                <button 
                  className="text-blue-500 hover:text-blue-700"
                  title="View"
                >
                  <FaEye />
                </button>
                <button 
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-23">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="mb-4 border-b">
        <nav className="-mb-px flex">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 border-b-2 ${
              activeTab === 'posts' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Posts ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 border-b-2 ${
              activeTab === 'users' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Users ({users.length})
          </button>
        </nav>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        {activeTab === 'posts' ? renderPostsTable() : renderUsersTable()}
      </div>
    </div>
  );
};

export default Admin;