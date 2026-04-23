import React, { useState } from 'react';

export default function UserForm({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '' });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    onSubmit(form);
    setForm({ name: '', email: '' });
  };

  return (
    <div className="card">
      <h2>➕ Add New User</h2>
      <div className="form-group">
        <label>Full Name</label>
        <input name="name" value={form.name} onChange={handle} placeholder="e.g. Theo" />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input name="email" type="email" value={form.email} onChange={handle} placeholder="theo@example.com" />
      </div>
      <button className="btn btn-primary" onClick={submit}>Create User</button>
    </div>
  );
}
