import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, addDoc, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams, Link } from 'react-router-dom';
import { BlogPost, Comment } from '../types';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      const q = query(collection(db, 'posts'), where('slug', '==', slug));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const postData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BlogPost;
        setPost(postData);
        fetchComments(postData.id);
        fetchRelatedPosts(postData.category, postData.id);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    };
    fetchPost();
  }, [slug]);

  const fetchComments = async (postId: string) => {
    const q = query(collection(db, 'comments'), where('postId', '==', postId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment)));
  };

  const fetchRelatedPosts = async (category: string, currentPostId: string) => {
    const q = query(collection(db, 'posts'), where('published', '==', true), where('category', '==', category), orderBy('createdAt', 'desc'), limit(4));
    const snapshot = await getDocs(q);
    const related = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost)).filter(p => p.id !== currentPostId).slice(0, 3);
    setRelatedPosts(related);
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !commentName.trim() || !commentText.trim()) return;
    
    await addDoc(collection(db, 'comments'), {
      postId: post.id,
      author: commentName,
      content: commentText,
      createdAt: Date.now()
    });
    
    setCommentName('');
    setCommentText('');
    fetchComments(post.id);
  };

  if (loading) return <div className="section text-center text-muted" style={{ minHeight: '100vh', paddingTop: '150px' }}>Loading...</div>;
  if (!post) return <div className="section text-center text-muted" style={{ minHeight: '100vh', paddingTop: '150px' }}>Post not found</div>;

  const currentUrl = window.location.href;

  return (
    <div className="section" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link to={`/category/${post.category}`} className="text-gold uppercase tracking-widest text-xs font-semibold" style={{ textDecoration: 'none' }}>{post.category}</Link>
          <h1 className="text-white font-playfair text-4xl md:text-5xl mt-3 mb-4" style={{ lineHeight: '1.2' }}>{post.title}</h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <span><i className="fa-regular fa-user text-gold"></i> {post.author}</span>
            <span>&bull;</span>
            <span><i className="fa-regular fa-calendar text-gold"></i> {format(post.createdAt, 'MMMM dd, yyyy')}</span>
            <span>&bull;</span>
            <span><i className="fa-regular fa-clock text-gold"></i> {post.readingTime} min read</span>
          </div>
        </div>

        <img src={post.featuredImage} alt={post.title} style={{ width: '100%', height: 'auto', maxHeight: '450px', objectFit: 'cover', borderRadius: '12px', marginBottom: '3rem', border: '1px solid var(--border-faint)' }} />

        <div className="markdown-body" style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: '1.8' }}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        
        <div style={{ marginTop: '3rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {post.tags?.map(tag => (
            <span key={tag} style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>#{tag}</span>
          ))}
        </div>

        {/* Social Share */}
        <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <strong className="text-white">Share:</strong>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none' }}><i className="fa-brands fa-x-twitter"></i></a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none' }}><i className="fa-brands fa-facebook-f"></i></a>
          <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + currentUrl)}`} target="_blank" rel="noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none' }}><i className="fa-brands fa-whatsapp"></i></a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none' }}><i className="fa-brands fa-linkedin-in"></i></a>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-faint)', margin: '4rem 0' }} />

        {/* Comments Section */}
        <div>
          <h3 className="text-white font-playfair text-2xl mb-4">Comments ({comments.length})</h3>
          
          <form onSubmit={submitComment} style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-faint)', marginBottom: '3rem' }}>
            <h4 className="text-white text-lg mb-3">Leave a Reply</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Your Name" value={commentName} onChange={e => setCommentName(e.target.value)} required style={{ padding: '0.75rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', color: 'white' }} />
              <textarea placeholder="Your Comment" value={commentText} onChange={e => setCommentText(e.target.value)} required rows={4} style={{ padding: '0.75rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-faint)', color: 'white', resize: 'vertical' }} />
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Post Comment</button>
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {comments.map(comment => (
              <div key={comment.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-faint)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong className="text-white">{comment.author}</strong>
                  <span className="text-muted text-xs">{format(comment.createdAt, 'MMM dd, yyyy')}</span>
                </div>
                <p className="text-muted text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div style={{ marginTop: '5rem' }}>
            <h3 className="text-white font-playfair text-2xl mb-4 text-center">Related {post.category}</h3>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {relatedPosts.map(rp => (
                <div key={rp.id} style={{ background: 'var(--bg-card)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-faint)', transition: '0.3s' }} className="blog-card">
                  <Link to={`/post/${rp.slug}`}>
                    <div style={{ height: '140px', overflow: 'hidden' }}>
                      <img src={rp.featuredImage} alt={rp.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-scale" />
                    </div>
                  </Link>
                  <div style={{ padding: '1rem' }}>
                    <Link to={`/post/${rp.slug}`} style={{ textDecoration: 'none' }}>
                      <h4 className="text-white font-playfair text-md mb-2" style={{ lineHeight: '1.4' }}>{rp.title}</h4>
                    </Link>
                    <span className="text-muted text-xs">{format(rp.createdAt, 'MMM dd, yyyy')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        .markdown-body h2, .markdown-body h3 { color: var(--gold); font-family: 'Playfair Display', serif; margin-top: 2rem; margin-bottom: 1rem; }
        .markdown-body p { margin-bottom: 1.5rem; }
        .markdown-body ul, .markdown-body ol { margin-bottom: 1.5rem; padding-left: 2rem; }
        .markdown-body li { margin-bottom: 0.5rem; }
        .markdown-body a { color: var(--gold); text-decoration: none; }
        .markdown-body a:hover { text-decoration: underline; }
        .markdown-body blockquote { border-left: 4px solid var(--gold); padding-left: 1rem; margin-left: 0; font-style: italic; color: var(--text-muted); }
        .blog-card:hover { border-color: var(--border-color); transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .blog-card:hover .hover-scale { transform: scale(1.05); }
      `}</style>
    </div>
  );
}
