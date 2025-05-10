import React, { useState, useEffect } from 'react';
import { getPosts, getPost } from '../../api.js';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadAllPosts() {
      const data = await getPosts();
      setPosts(data);
    }
    loadAllPosts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReadMore = async (id) => {
    setLoading(true);
    const fullPost = await getPost(id);
    setSelectedPost(fullPost);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white shadow-2xl flex-col md:flex-row mt-22">
      <nav className="bg-yellow-400 text-black">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center space-x-8">
          <span>Recent Posts</span>
          <span>Popular Posts</span>
          <span>Categories</span>
          <span>Subscribe</span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by Title..."
            className="ml-auto px-2 py-1 border rounded"
          />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 flex space-x-8">
        <div className="w-3/4">
          <h2 className="text-2xl font-bold mb-4">Recent Blog Posts</h2>

          {posts
            .filter((post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((post) => (
              <div key={post._id} className="bg-gray-100 p-4 mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={post.image || 'placeholder.png'}
                    alt="Blog Post"
                    className="w-20 h-20 object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-700">{post.description}</p>
                    <button
                      onClick={() => handleReadMore(post._id)}
                      className="mt-2 text-blue-600 underline"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {loading && <p>Loading...</p>}
          {selectedPost && !loading && (
            <div className="bg-white p-6 border mt-6">
              <h2 className="text-xl font-bold">{selectedPost.title}</h2>
              {/*<img
                src={selectedPost.image || 'placeholder.png'}
                alt="Post"
                className="w-full h-60 object-cover my-4"
              />*/}
              <p>{selectedPost.content}</p>
              <button
                onClick={() => setSelectedPost(null)}
                className="mt-4 text-red-500 underline">
                Close
              </button>
            </div>
          )}
        </div>



        <div className="w-1/4">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <div className="bg-gray-100 p-4">
            <p className="mb-4">
              <strong>User1:</strong> Great post! I really enjoyed reading it.
            </p>
            <input type="text" placeholder="Your Name" className="border w-full p-2 mb-2" />
            <textarea placeholder="Your Comment" className="border w-full p-2 mb-2" rows="3" />
            <button className="bg-purple-600 text-white px-4 py-2">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
