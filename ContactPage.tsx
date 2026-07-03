import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;
    
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: Date.now()
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus('error');
    }
  };

  return (
    <div className="section" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-subtitle text-gold uppercase tracking-widest text-sm mb-1">GET IN TOUCH</p>
          <h2 className="section-title text-white font-playfair text-5xl">Contact Me</h2>
          <div className="title-divider mx-auto mb-5"></div>
          <p className="text-muted text-sm mx-auto" style={{ maxWidth: '600px' }}>
            Have a project in mind, need creative content, or looking for reliable virtual assistance? 
            Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-faint)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <i className="fa-solid fa-circle-check text-gold mb-4" style={{ fontSize: '4rem' }}></i>
              <h3 className="text-white font-playfair text-2xl mb-2">Message Sent Successfully!</h3>
              <p className="text-muted">Thank you for reaching out. I will get back to you shortly.</p>
              <button 
                onClick={() => setStatus('idle')} 
                className="btn btn-outline mt-5"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label className="text-muted text-xs uppercase tracking-wider mb-2" style={{ display: 'block' }}>Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="contact-input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-muted text-xs uppercase tracking-wider mb-2" style={{ display: 'block' }}>Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="contact-input"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label className="text-muted text-xs uppercase tracking-wider mb-2" style={{ display: 'block' }}>Phone Number (Optional)</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="contact-input"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div>
                  <label className="text-muted text-xs uppercase tracking-wider mb-2" style={{ display: 'block' }}>Subject *</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                    className="contact-input"
                    placeholder="How can I help you?"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted text-xs uppercase tracking-wider mb-2" style={{ display: 'block' }}>Message *</label>
                <textarea 
                  name="message"
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  rows={6} 
                  className="contact-input"
                  placeholder="Tell me about your project..."
                  style={{ resize: 'vertical' }}
                />
              </div>

              {status === 'error' && (
                <p style={{ color: '#ff4444', fontSize: '0.875rem' }}>There was an error sending your message. Please try again.</p>
              )}

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ alignSelf: 'flex-start', padding: '1rem 2.5rem', fontSize: '1rem' }}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : (
                  <>Send Message <i className="fa-solid fa-paper-plane" style={{ marginLeft: '8px' }}></i></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      
      <style>{`
        .contact-input {
          width: 100%;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-faint);
          color: white;
          font-family: inherit;
          transition: all 0.3s ease;
        }
        .contact-input:focus {
          outline: none;
          border-color: var(--gold);
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 0 2px rgba(212,175,55,0.2);
        }
        .contact-input::placeholder {
          color: rgba(255,255,255,0.2);
        }
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
