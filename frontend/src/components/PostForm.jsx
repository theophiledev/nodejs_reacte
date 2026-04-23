import React, { useState } from 'react';

export default function PostForm({ onSubmit, users }) {
  const [form, setForm] = useState({ title: '', content: '', authorId: '' });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.authorId) return;
    onSubmit(form);
    setForm({ title: '', content: '', authorId: '' });
  };

  return (
    <div className="card">
      <h2>➕ Create New Post</h2>
      <div className="form-group">
        <label>Title</label>
        <input name="title" value={form.title} onChange={handle} placeholder="Post title..." />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea name="content" value={form.content} onChange={handle} placeholder="Post content..." rows={3} style={{width:'100%',padding:'10px',background:'#2d3748',border:'1px solid #4a5568',borderRadius:'6px',color:'#e2e8f0'}} />
      </div>
      <div className="form-group">
        <label>Author</label>
        <select name="authorId" value={form.authorId} onChange={handle}>
          <option value="">-- Select Author --</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </div>
      <button className="btn btn-primary" onClick={submit}>Create Post</button>
    </div>
  );
}
