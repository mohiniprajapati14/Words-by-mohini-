import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useParams } from 'react-router-dom';
import { BlogPost } from '../types';
import { format } from 'date-fns';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setCurrentPage(1);
      const q = query(collection(db, 'posts'), where('published', '==', true), where('category', '==', category), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost)));
      setLoading(false);
    };
    if (category) fetchPosts();
  }, [category]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="section" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-subtitle text-gold uppercase tracking-widest text-sm mb-1">CATEGORY</p>
          <h2 className="section-title text-white font-playfair text-5xl">{category}</h2>
          <div className="title-divider mx-auto mb-5"></div>
        </div>

        {loading ? (
          <div className="text-center text-muted">Loading posts...</div>
        ) : (
          <>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {currentPosts.map(post => (
                <div key={post.id} style={{ background: 'var(--bg-card)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-faint)', transition: '0.3s' }} className="blog-card">
                  <Link to={`/post/${post.slug}`}>
                    <div style={{ height: '220px', overflow: 'hidden' }}>
                      <img src={post.featuredImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-scale" />
                    </div>
                  </Link>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="text-gold text-xs uppercase tracking-wider font-semibold">{post.category}</span>
                      <span className="text-muted text-xs"><i className="fa-regular fa-clock"></i> {post.readingTime} min read</span>
                    </div>
                    <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none' }}>
                      <h3 className="text-white font-playfair text-xl mb-3" style={{ lineHeight: '1.4' }}>{post.title}</h3>
                    </Link>
                    <p className="text-muted text-sm mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-faint)', paddingTop: '1rem' }}>
                      <span className="text-white text-xs">{post.author}</span>
                      <span className="text-muted text-xs">{format(post.createdAt, 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '4rem' }}>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentPage(i + 1)}
                    style={{ 
                      width: '40px', height: '40px', borderRadius: '50%', 
                      border: '1px solid var(--gold)', 
                      background: currentPage === i + 1 ? 'var(--gold)' : 'transparent',
                      color: currentPage === i + 1 ? 'black' : 'var(--gold)',
                      cursor: 'pointer', transition: '0.3s'
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
        
        {!loading && posts.length === 0 && (
          <div className="text-center text-muted">No posts found in this category.</div>
        )}
      </div>
      <style>{`
        .blog-card:hover { border-color: var(--border-color); transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .blog-card:hover .hover-scale { transform: scale(1.05); }
      `}</style>
    </div>
  );
}
