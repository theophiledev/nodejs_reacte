import React from 'react';

export default function PostList({ posts }) {
  if (!posts.length) return <div className="card"><p style={{color:'#718096'}}>No posts yet. Create one above!</p></div>;

  return (
    <div className="card">
      <h2>📄 All Posts ({posts.length})</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Title</th><th>Author</th><th>Status</th><th>Created</th></tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id}>
              <td>#{p.id}</td>
              <td>{p.title}</td>
              <td>{p.author?.name || 'Unknown'}</td>
              <td>
                <span className={`badge ${p.published ? '' : 'unpublished'}`}>
                  {p.published ? 'Published' : 'Draft'}
                </span>
              </td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
