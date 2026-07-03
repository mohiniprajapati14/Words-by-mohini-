import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <header id="hero" className="hero section">
        <div className="container hero-container">
          <div className="hero-text reveal">
            <h3 className="script-text">Welcome to</h3>
            <h1>WORDS BY<br/><span className="text-gold">MOHINI</span></h1>
            <h4 className="script-text text-gold mb-3">Your Business, My Words, Our Success.</h4>
            <div className="divider"></div>
            <p className="hero-subtitle">CONTENT WRITING | CREATIVE WRITING<br/>AI VIRTUAL ASSISTANT | DATA ENTRY SPECIALIST</p>
            <p className="hero-desc">Helping businesses grow with engaging content, creative narratives, and reliable virtual support. Quality work, on-time delivery & 100% client satisfaction is my promise.</p>
            
            <div className="hero-btns">
              <a href="#contact" className="btn btn-primary">HIRE ME <i className="fa-solid fa-chevron-right"></i></a>
              <Link to="/blog" className="btn btn-outline">READ MY BLOG <i className="fa-solid fa-chevron-right"></i></Link>
            </div>
            
            <div className="trusted-by mt-4">
              <div className="avatars">
                <img src="https://i.pravatar.cc/150?img=11" alt="Client 1" />
                <img src="https://i.pravatar.cc/150?img=33" alt="Client 2" />
                <img src="https://i.pravatar.cc/150?img=47" alt="Client 3" />
                <img src="https://i.pravatar.cc/150?img=12" alt="Client 4" />
              </div>
              <span>Trusted by <strong className="text-gold">200+</strong> Clients Worldwide</span>
            </div>
          </div>
          <div className="hero-image reveal">
            <div className="glow-ring"></div>
            <img src="/profile.jpg" alt="Mohini" className="profile-img" />
          </div>
        </div>
      </header>

      {/* Features Banner */}
      <section className="features-banner">
        <div className="container features-grid">
          <div className="feature-item reveal">
            <i className="fa-solid fa-shield-halved text-gold"></i>
            <div className="feature-text">
              <h4>100%<br/>ACCURACY</h4>
              <p>Precise & error-free work</p>
            </div>
          </div>
          <div className="feature-item reveal">
            <i className="fa-solid fa-bolt text-gold"></i>
            <div className="feature-text">
              <h4>FAST<br/>DELIVERY</h4>
              <p>Always on-time guaranteed</p>
            </div>
          </div>
          <div className="feature-item reveal">
            <i className="fa-solid fa-lock text-gold"></i>
            <div className="feature-text">
              <h4>CONFIDENTIAL<br/>WORK</h4>
              <p>Your data is safe with me</p>
            </div>
          </div>
          <div className="feature-item reveal">
            <i className="fa-solid fa-headset text-gold"></i>
            <div className="feature-text">
              <h4>24/7<br/>SUPPORT</h4>
              <p>I'm always here to help you</p>
            </div>
          </div>
          <div className="feature-item reveal">
            <i className="fa-solid fa-star text-gold"></i>
            <div className="feature-text">
              <h4>100%<br/>CLIENT SATISFACTION</h4>
              <p>Your satisfaction is my priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section text-center">
        <div className="container">
          <p className="section-subtitle text-gold uppercase tracking-widest text-sm mb-1">WHAT I OFFER</p>
          <h2 className="section-title text-white font-playfair text-4xl">My Premium Services</h2>
          <div className="title-divider mx-auto mb-5"></div>
          
          <div className="grid services-grid mt-5">
            <div className="service-card reveal">
              <i className="fa-solid fa-pen-nib text-gold"></i>
              <h3>Content Writing</h3>
              <p>Engaging and SEO-friendly articles, blogs, and web content</p>
            </div>
            <div className="service-card reveal">
              <i className="fa-solid fa-book-open text-gold"></i>
              <h3>Creative Writing</h3>
              <p>Captivating poems, short stories, and narratives</p>
            </div>
            <div className="service-card reveal">
              <i className="fa-solid fa-file-invoice text-gold"></i>
              <h3>Data Entry</h3>
              <p>Accurate and fast data entry services</p>
            </div>
            <div className="service-card reveal">
              <i className="fa-solid fa-table-cells text-gold"></i>
              <h3>Excel Data Management</h3>
              <p>Organize and manage your Excel data</p>
            </div>
            <div className="service-card reveal">
              <i className="fa-solid fa-magnifying-glass text-gold"></i>
              <h3>Web Research</h3>
              <p>Detailed research for your business needs</p>
            </div>
            <div className="service-card reveal">
              <i className="fa-solid fa-robot text-gold"></i>
              <h3>AI Virtual Assistant</h3>
              <p>Smart assistance for your business needs</p>
            </div>
            <div className="service-card reveal">
              <i className="fa-solid fa-clipboard text-gold"></i>
              <h3>Copy & Paste Tasks</h3>
              <p>Fast and accurate copy paste work</p>
            </div>
            <div className="service-card reveal">
              <i className="fa-solid fa-envelope-open-text text-gold"></i>
              <h3>Email Management</h3>
              <p>Manage your emails professionally</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="container about-container">
          <div className="about-image reveal">
            <div className="glow-ring"></div>
            <img src="/profile.jpg" alt="Mohini" />
            <div className="signature">Mohini</div>
          </div>
          <div className="about-text reveal">
            <p className="section-subtitle text-gold uppercase tracking-widest text-sm mb-1">ABOUT ME</p>
            <h2 className="text-white text-5xl mb-4 font-playfair">Hi, I'm <span className="text-gold">Mohini</span></h2>
            
            <p className="mb-4 text-sm text-muted">A dedicated Content Writer, Creative Writer, and Virtual Assistant from India, helping businesses and entrepreneurs save time, stay organized, and grow faster through powerful words.</p>
            <p className="mb-4 text-sm text-muted">I am committed to delivering high-quality work with 100% accuracy, quick communication and on-time delivery.</p>
            
            <a href="#about" className="btn btn-outline mb-5 inline-block">MORE ABOUT ME <i className="fa-solid fa-chevron-right"></i></a>
            
            <div className="stats-grid mt-4">
              <div className="stat-item">
                <i className="fa-solid fa-award text-gold text-3xl"></i>
                <div>
                  <h4 className="text-white text-xl">2+</h4>
                  <p className="text-xs text-muted">Years Experience</p>
                </div>
              </div>
              <div className="stat-item">
                <i className="fa-solid fa-users text-gold text-3xl"></i>
                <div>
                  <h4 className="text-white text-xl">200+</h4>
                  <p className="text-xs text-muted">Happy Clients</p>
                </div>
              </div>
              <div className="stat-item">
                <i className="fa-solid fa-clipboard-check text-gold text-3xl"></i>
                <div>
                  <h4 className="text-white text-xl">500+</h4>
                  <p className="text-xs text-muted">Projects Completed</p>
                </div>
              </div>
              <div className="stat-item">
                <i className="fa-solid fa-star text-gold text-3xl"></i>
                <div>
                  <h4 className="text-white text-xl">100%</h4>
                  <p className="text-xs text-muted">Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section text-center">
        <div className="container">
          <p className="section-subtitle text-gold uppercase tracking-widest text-sm mb-1">CLIENTS LOVE MY WORK</p>
          <h2 className="section-title text-white font-playfair text-4xl">Client Reviews</h2>
          <p className="text-muted text-sm mx-auto mb-5" style={{ maxWidth: '600px' }}>Real reviews will be added here as they are received.</p>
          <div className="title-divider mx-auto mb-5"></div>
          
          <div className="grid testimonials-grid mt-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="testimonial-card reveal text-left relative" style={{ opacity: 0.6 }}>
                <i className="fa-solid fa-quote-right quote-icon"></i>
                <div className="stars mb-3">
                  <i className="fa-regular fa-star text-gold text-xs"></i>
                  <i className="fa-regular fa-star text-gold text-xs"></i>
                  <i className="fa-regular fa-star text-gold text-xs"></i>
                  <i className="fa-regular fa-star text-gold text-xs"></i>
                  <i className="fa-regular fa-star text-gold text-xs"></i>
                </div>
                <div className="mb-4" style={{ height: '60px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}></div>
                <div className="client-info flex align-center gap-3 mt-auto">
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fa-regular fa-user text-muted"></i>
                  </div>
                  <div>
                    <div style={{ height: '14px', width: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '4px' }}></div>
                    <div style={{ height: '10px', width: '60px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="dots mt-4 flex justify-center gap-2">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="section text-center cta-section relative overflow-hidden">
        <div className="container relative z-10">
          <h3 className="script-text text-gold text-5xl mb-1">Let's Work Together</h3>
          <h2 className="text-white text-4xl font-playfair mb-3">Ready to Get Started?</h2>
          <p className="mb-5 text-muted">I'm just a message away!</p>
          
          <div className="flex justify-center flex-wrap gap-4 mt-5">
            <Link to="/contact" className="btn btn-primary btn-contact" style={{ padding: '0.8rem 2rem' }}>
              <i className="fa-regular fa-envelope"></i> Send a Message
            </Link>
            <a href="#" className="btn btn-contact"><span style={{color: '#00b22d', fontWeight: 'bold'}}>fi</span> Fiverr</a>
            <a href="#" className="btn btn-contact"><span style={{color: '#14a800', fontWeight: 'bold'}}>Up</span> Upwork</a>
          </div>
        </div>
      </section>
    </>
  );
}
