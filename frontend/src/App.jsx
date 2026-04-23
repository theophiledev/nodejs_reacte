// STEP 6: Axios requests (GET/POST) to backend API
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './App.css';

const API = 'http://localhost:5000/api';

function App() {
  const [users, setUsers]   = useState([]);
  const [posts, setPosts]   = useState([]);
  const [tab, setTab]       = useState('users');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (err) {
      setMessage('❌ Error fetching users: ' + err.message);
    } finally { setLoading(false); }
  };

  // Fetch posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/posts`);
      setPosts(res.data);
    } catch (err) {
      setMessage('❌ Error fetching posts: ' + err.message);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); fetchPosts(); }, []);

  // Create user
  const createUser = async (data) => {
    try {
      await axios.post(`${API}/users`, data);
      setMessage('✅ User created!');
      fetchUsers();
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || err.message));
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/users/${id}`);
      setMessage('✅ User deleted!');
      fetchUsers();
    } catch (err) {
      setMessage('❌ ' + err.message);
    }
  };

  // Create post
  const createPost = async (data) => {
    try {
      await axios.post(`${API}/posts`, data);
      setMessage('✅ Post created!');
      fetchPosts();
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🗄️ Data Migration Pipeline</h1>
        <p>Node.js + React + PostgreSQL + Prisma</p>
      </header>

      {message && (
        <div className={`alert ${message.startsWith('✅') ? 'success' : 'error'}`}>
          {message}
          <button onClick={() => setMessage('')}>×</button>
        </div>
      )}

      <nav className="tabs">
        <button className={tab === 'users' ? 'active' : ''} onClick={() => setTab('users')}>
          👤 Users ({users.length})
        </button>
        <button className={tab === 'posts' ? 'active' : ''} onClick={() => setTab('posts')}>
          📝 Posts ({posts.length})
        </button>
      </nav>

      <main className="content">
        {loading && <div className="loading">Loading...</div>}

        {tab === 'users' && (
          <div className="section">
            <UserForm onSubmit={createUser} />
            <UserList users={users} onDelete={deleteUser} />
          </div>
        )}
        {tab === 'posts' && (
          <div className="section">
            <PostForm onSubmit={createPost} users={users} />
            <PostList posts={posts} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
