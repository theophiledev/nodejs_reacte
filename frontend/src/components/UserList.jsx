import React from 'react';

export default function UserList({ users, onDelete }) {
  if (!users.length) return <div className="card"><p style={{color:'#718096'}}>No users yet. Add one above!</p></div>;

  return (
    <div className="card">
      <h2>👥 All Users ({users.length})</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Posts</th><th>Action</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>#{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.posts?.length || 0}</td>
              <td>
                <button className="btn btn-danger" onClick={() => onDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
