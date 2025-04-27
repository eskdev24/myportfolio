
import { useEffect, useState } from 'react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Figma, Code, PenTool, Users } from 'lucide-react';

const skills = [
  {
    icon: <Figma className="h-6 w-6" />,
    title: "UI Design",
    description: "Creating beautiful, intuitive interfaces that delight users and meet business goals."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "UX Research",
    description: "Understanding user needs through research, interviews, and usability testing."
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Brand Identity",
    description: "Crafting cohesive visual languages that communicate brand values."
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Prototyping",
    description: "Building interactive prototypes to test and validate design solutions."
  }
];

const About = () => {
  const [aboutRef, isInView] = useInView();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);
  
  return (
    <section 
      id="about" 
      ref={aboutRef as React.RefObject<HTMLElement>} 
      className="py-20"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className={cn(
              "relative rounded-2xl overflow-hidden opacity-0",
              isVisible && "animate-fade-up opacity-100"
            )}>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2340"
                alt="Designer workspace"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className={cn(
              "inline-block rounded-full px-3 py-1 text-sm font-medium bg-primary/5 text-primary mb-4 opacity-0",
              isVisible && "animate-fade-up opacity-100"
            )}>
              About Me
            </span>
            
            <h2 className={cn(
              "text-3xl md:text-4xl font-display font-bold mb-6 opacity-0 [animation-delay:150ms]",
              isVisible && "animate-fade-up opacity-100"
            )}>
              Passionate about creating meaningful digital experiences
            </h2>
            
            <p className={cn(
              "text-lg text-muted-foreground mb-8 opacity-0 [animation-delay:300ms]",
              isVisible && "animate-fade-up opacity-100"
            )}>
              I'm a UX/UI designer with 5+ years of experience creating user-centered digital products. 
              My approach combines strategic thinking with creative problem-solving to deliver designs 
              that are both beautiful and functional.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className={cn(
                    "p-6 rounded-xl border border-border bg-white/50 opacity-0",
                    isVisible && "animate-fade-up opacity-100",
                    index === 0 ? "[animation-delay:450ms]" : "",
                    index === 1 ? "[animation-delay:600ms]" : "",
                    index === 2 ? "[animation-delay:750ms]" : "",
                    index === 3 ? "[animation-delay:900ms]" : ""
                  )}
                >
                  <div className="p-3 rounded-full bg-secondary w-fit mb-4">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{skill.title}</h3>
                  <p className="text-muted-foreground">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
