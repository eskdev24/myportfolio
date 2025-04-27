
import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [heroRef, isInView] = useInView();
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  };
  
  return (
    <section 
      id="home" 
      ref={heroRef as React.RefObject<HTMLElement>} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20 pb-12"
    >
      <div className="container px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          <div className="space-y-8">
            <span className={cn(
              "inline-block rounded-full px-3 py-1 text-sm font-medium bg-primary/5 text-primary opacity-0",
              isLoaded && "animate-fade-up opacity-100"
            )}>
              UX/UI Designer
            </span>
            
            <h1 className={cn(
              "text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-balance opacity-0 [animation-delay:150ms]",
              isLoaded && "animate-fade-up opacity-100"
            )}>
              Crafting intuitive digital experiences
            </h1>
            
            <p className={cn(
              "text-xl text-muted-foreground max-w-lg opacity-0 [animation-delay:300ms]",
              isLoaded && "animate-fade-up opacity-100"
            )}>
              I'm a product designer focused on creating beautiful, functional interfaces that solve real problems.
            </p>
            
            <div className={cn(
              "flex flex-col sm:flex-row gap-4 opacity-0 [animation-delay:450ms]",
              isLoaded && "animate-fade-up opacity-100"
            )}>
              <a 
                href="#portfolio" 
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99]"
              >
                View Portfolio
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-input bg-background text-foreground font-medium transition-all hover:bg-accent hover:text-accent-foreground hover:scale-[1.01] active:scale-[0.99]"
              >
                Get in Touch
              </a>
            </div>
          </div>
          
          <div className={cn(
            "perspective relative opacity-0 [animation-delay:600ms]",
            isLoaded && "animate-fade-up opacity-100"
          )}>
            <div 
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative rounded-2xl overflow-hidden shadow-lg transition-transform duration-200 ease-out transform-gpu preserve-3d"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10 pointer-events-none"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2340" 
                alt="Designer working on a project" 
                className="w-full h-[500px] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
      
      <a 
        href="#portfolio"
        className={cn(
          "absolute bottom-12 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200 opacity-0 [animation-delay:900ms]",
          isLoaded && "animate-fade-up opacity-100 animate-float"
        )}
      >
        <ArrowDown size={20} />
      </a>
    </section>
  );
};

export default Hero;
