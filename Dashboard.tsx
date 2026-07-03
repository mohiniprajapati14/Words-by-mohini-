import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';

const CATEGORIES = ['Poems', 'Short Stories', 'Blogs', 'Articles', 'Content Writing'];

export default function Dashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) navigate('/login');
      else fetchPosts();
    });
    return unsubscribe;
  }, []);

  const fetchPosts = async () => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost)));
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      ...currentPost,
      slug: currentPost.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      updatedAt: Date.now(),
    };
    
    if (currentPost.id) {
      await updateDoc(doc(db, 'posts', currentPost.id), postData);
    } else {
      postData.createdAt = Date.now();
      postData.author = 'Mohini';
      if(postData.tags === undefined) postData.tags = [];
      await addDoc(collection(db, 'posts'), postData);
    }
    
    setIsEditing(false);
    setCurrentPost({});
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteDoc(doc(db, 'posts', id));
      fetchPosts();
    }
  };

  if (loading) return <div className="section text-center"><p>Loading...</p></div>;

  return (
    <div className="section" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="text-white text-4xl font-playfair">Dashboard</h2>
          <button 
            className="btn btn-primary" 
            onClick={() => { setIsEditing(true); setCurrentPost({ published: false, category: 'Blogs', readingTime: 5 }); }}
          >
            New Post
          </button>
        </div>

        {isEditing ? (
          <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h3 className="text-white text-2xl font-playfair mb-4">{currentPost.id ? 'Edit Post' : 'Create Post'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="text-muted text-xs uppercase tracking-wider mb-1" style={{ display: 'block' }}>Title</label>
                <input type="text" value={currentPost.title || ''} onChange={e => setCurrentPost({...currentPost, title: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', color: 'white' }} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="text-muted text-xs uppercase tracking-wider mb-1" style={{ display: 'block' }}>Category</label>
                  <select value={currentPost.category || ''} onChange={e => setCurrentPost({...currentPost, category: e.target.value as any})} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', color: 'white' }} required>
                    {CATEGORIES.map(c => <option key={c} value={c} style={{ color: 'black' }}>{c}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="text-muted text-xs uppercase tracking-wider mb-1" style={{ display: 'block' }}>Reading Time (mins)</label>
                  <input type="number" value={currentPost.readingTime || 0} onChange={e => setCurrentPost({...currentPost, readingTime: parseInt(e.target.value)})} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', color: 'white' }} required />
                </div>
              </div>
              <div>
                <label className="text-muted text-xs uppercase tracking-wider mb-1" style={{ display: 'block' }}>Featured Image URL</label>
                <input type="url" value={currentPost.featuredImage || ''} onChange={e => setCurrentPost({...currentPost, featuredImage: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', color: 'white' }} required />
              </div>
              <div>
                <label className="text-muted text-xs uppercase tracking-wider mb-1" style={{ display: 'block' }}>Excerpt</label>
                <textarea value={currentPost.excerpt || ''} onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})} rows={2} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', color: 'white', resize: 'vertical' }} required />
              </div>
              <div>
                <label className="text-muted text-xs uppercase tracking-wider mb-1" style={{ display: 'block' }}>Content (Markdown supported)</label>
                <textarea value={currentPost.content || ''} onChange={e => setCurrentPost({...currentPost, content: e.target.value})} rows={15} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', color: 'white', resize: 'vertical' }} required />
              </div>
              <div>
                <label className="text-muted text-xs uppercase tracking-wider mb-1" style={{ display: 'block', cursor: 'pointer' }}>
                  <input type="checkbox" checked={currentPost.published || false} onChange={e => setCurrentPost({...currentPost, published: e.target.checked})} style={{ marginRight: '8px' }} />
                  Publish Post
                </label>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary">Save Post</button>
                <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-card)', borderRadius: '12px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border-faint)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--gold)' }}>Title</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--gold)' }}>Category</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--gold)' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--gold)' }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--gold)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} style={{ borderBottom: '1px solid var(--border-faint)' }}>
                    <td style={{ padding: '1rem' }}>{post.title}</td>
                    <td style={{ padding: '1rem' }}>{post.category}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', background: post.published ? 'rgba(0,178,45,0.2)' : 'rgba(255,255,255,0.1)', color: post.published ? '#00b22d' : 'white' }}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button onClick={() => { setCurrentPost(post); setIsEditing(true); }} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', marginRight: '1rem' }}><i className="fa-solid fa-pen"></i></button>
                      <button onClick={() => handleDelete(post.id)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No posts found. Create your first post!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
