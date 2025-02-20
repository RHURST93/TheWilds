import React, { useState } from 'react';
import Header from "../components/header.js";

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Email submitted:', email);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmail('');
    }
  };
  
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 text-white">
      
      
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="max-w-4xl w-full text-center mb-16">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-5xl p-1 md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Coming Soon
            </h1>
            <div className="h-1 w-24 md:w-40 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-600"></div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-light mb-8">
            A new collection is on the horizon
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            I'm putting together a collection of photos for my latest collection of breathtaking photography prints 
            compiled into a calendar. Each months image will  be carefully selected to bring the beauty of nature your space.
          </p>
        </div>
        
        <div className="w-full max-w-3xl mb-16 relative">
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1500051638674-ff996a0ec29e')] bg-cover bg-center"></div>
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-800/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium border border-zinc-700 shadow-lg">
            Launching Fall 2025
          </div>
        </div>
        
        
        
        <div className="w-full flex justify-center items-center mb-16">
          <div 
            className="p-6 bg-zinc-800/40 backdrop-filter backdrop-blur-sm border border-zinc-700 rounded-xl hover:bg-zinc-800/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 max-w-xl"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Calendars</h3>
              <p className="text-gray-400 text-center">Beauty of nature on your wall, with a different photo for every month.</p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h4 className="text-center text-gray-400 mb-4">Follow our journey</h4>
          <div className="flex space-x-6">
            {[
              { name: 'instagram', icon: 'M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 14.5a.5.5 0 110-1 .5.5 0 010 1zM7.085 7.914c.535-1.416 1.96-2.415 3.572-2.414 2.047 0 3.714 1.61 3.83 3.638l.002.29v.035c0 1.301-.43 2.173-1.423 3.205l-.191.191-.474.457c-.59.56-.915.934-.915 1.684h-2c0-1.474.618-2.408 1.667-3.396l.298-.278c.655-.625.95-1.208.95-1.897v-.035c-.116-1.003-.957-1.783-2-1.783-.835 0-1.554.473-1.912 1.045l-.072.129-.23.46-.756.377c-.29.153-.646.099-.88-.135-.234-.234-.288-.59-.136-.88z' },
              { name: 'twitter', icon: 'M20 7.539c-.581.257-1.203.43-1.857.508a3.24 3.24 0 001.428-1.794 6.476 6.476 0 01-2.054.785A3.243 3.243 0 0014.77 6c-1.79 0-3.242 1.452-3.242 3.242 0 .254.028.501.084.738a9.205 9.205 0 01-6.676-3.382 3.241 3.241 0 001.003 4.326 3.224 3.224 0 01-1.468-.406v.041a3.242 3.242 0 002.601 3.177 3.24 3.24 0 01-1.465.056 3.241 3.241 0 003.026 2.251A6.499 6.499 0 014 17.538a9.168 9.168 0 004.96 1.454c5.95 0 9.211-4.929 9.211-9.211 0-.14-.003-.28-.009-.42A6.564 6.564 0 0020 7.538z' },
              { name: 'facebook', icon: 'M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z' },
              { name: 'pinterest', icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.16c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z' }
            ].map(social => (
              <a
                key={social.name}
                href={`#${social.name}`}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-gray-400 hover:text-white"
                aria-label={social.name}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        
        <footer className="text-sm text-gray-500">
          <p>© {new Date().getFullYear()} The Wilds Gallery. All rights reserved.</p>
        </footer>
      </div>
      
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-600/5 to-purple-600/5 animate-pulse"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 15 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default ComingSoon;