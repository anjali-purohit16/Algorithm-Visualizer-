import  { useEffect, useState } from 'react';
import Challenges from '@/host/components/challenges/challenges';
import Navbar from '@/lib/components/navbar/navbar';
import ThemeIcon from '@/lib/components/theme-icon/theme-icon';

function Index() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Triggers animations on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToChallenges = () => {
    document.getElementById('challenges-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cyber Theme Colors
  const theme = {
    primary: '#00f2ff', // Neon Cyan
    secondary: '#7000ff', // Electric Purple
    bg: '#0f172a' // Dark Slate Background
  };

  return (
    <div style={{ 
      fontFamily: "'Inter', sans-serif", 
      backgroundColor: theme.bg, // CHANGED: Dark background to match cards
      minHeight: '100vh',
      color: 'white'
    }}>
      
      {/* --- CSS ANIMATIONS --- */}
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-element { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.3s; }
          .delay-300 { animation-delay: 0.5s; }
        `}
      </style>

      <ThemeIcon top={20} right={20} />
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
        <Navbar title="Algo visualizers" />
      </div>

      {/* --- HERO SECTION --- */}
      <header style={{
        position: 'relative',
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        perspective: '1000px'
      }}>
        
        {/* 1. Interactive Background Image */}
        <div style={{
          position: 'absolute', inset: '-20px',
          backgroundImage: 'url("https://i.pinimg.com/736x/61/5f/66/615f663fddf45fdadfe4f439e1d4b58c.jpg")', // Your Pinterest Image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // Moves slightly opposite to mouse
          transform: `translate(${mousePosition.x * -150}px, ${mousePosition.y * -50}px) scale(${isLoaded ? 1.05 : 1})`,
          transition: 'transform 0.5s ease-out',
          zIndex: 0
        }}></div>

        {/* 2. Dark Cyber Gradient Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          // Darker overlay at bottom to blend into the dark content section
          background: `linear-gradient(to bottom, rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.95), ${theme.bg})`,
          zIndex: 1
        }}></div>

        {/* 3. Content */}
        <div style={{ position: 'relative', zIndex: 10, padding: '0 20px', maxWidth: '900px' }}>
          
          <h1 className="animate-element delay-100" style={{ 
            fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', 
            fontWeight: '900', 
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            background: `linear-gradient(135deg, ${theme.primary} 0%, #fff 50%, ${theme.secondary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: `drop-shadow(0 0 30px ${theme.primary}50)`
          }}>
            Master Algorithms <br/>
            Visually.
          </h1>
          
          <p className="animate-element delay-200" style={{ 
            fontSize: 'clamp(1.2rem, 2vw, 1.4rem)', 
            fontWeight: '400',
            color: '#cbd5e1',
            marginBottom: '3rem',
            maxWidth: '700px',
            margin: '0 auto 3rem auto'
          }}>
            Dive into interactive visualizations. The most intuitive way to learn complex logic.
          </p>

          <button 
            onClick={scrollToChallenges}
            className="animate-element delay-300"
            style={{
              padding: '18px 50px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: theme.bg,
              backgroundColor: theme.primary,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              boxShadow: `0 0 30px ${theme.primary}60`, // Neon Glow
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 0 50px ${theme.primary}90`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 0 30px ${theme.primary}60`;
            }}
          >
            Initialize System
          </button>
        </div>
      </header>

      {/* --- CHALLENGES SECTION --- */}
      <main id="challenges-section" style={{ 
        position: 'relative', 
        zIndex: 2, 
        backgroundColor: theme.bg, // IMPORTANT: Dark background here too
        padding: '4rem 2rem',
        minHeight: '50vh'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
           <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'white' }}>Algorithm Library</h2>
              {/* Neon Divider */}
              <div style={{ 
                width: '80px', height: '4px', 
                background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`, 
                margin: '15px auto', borderRadius: '2px' 
              }}></div>
           </div>
           
           <Challenges />
        </div>
      </main>

    </div>
  );
}

export default Index;