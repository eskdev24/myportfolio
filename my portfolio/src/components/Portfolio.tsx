import { useEffect, useState } from 'react';
import { useInView } from '@/lib/animations';
import PortfolioItem from './PortfolioItem';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Project } from '@/types/project';
import { Database } from '@/integrations/supabase/types';

const Portfolio = () => {
  const [portfolioRef, isInView] = useInView();
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setProjects(data as Project[]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  return (
    <section 
      id="portfolio" 
      ref={portfolioRef as React.RefObject<HTMLElement>} 
      className="py-20 bg-secondary/50"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-primary/5 text-primary mb-4 opacity-0 animate-fade-up">
            Selected Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 opacity-0 [animation-delay:150ms] animate-fade-up">
            Showcasing My Creative Process
          </h2>
          <p className="text-lg text-muted-foreground opacity-0 [animation-delay:300ms] animate-fade-up">
            Each project represents a unique challenge and solution, demonstrating my approach to design thinking.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isVisible && projects.length > 0 ? (
              projects.map((project, index) => (
                <PortfolioItem
                  key={project.id}
                  index={index}
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  imageSrc={project.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340'}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No projects found. Add some through the Supabase dashboard.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
