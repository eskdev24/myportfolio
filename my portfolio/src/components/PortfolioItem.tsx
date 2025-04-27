
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface PortfolioItemProps {
  title: string;
  description: string;
  category: string;
  imageSrc: string;
  index: number;
}

const PortfolioItem = ({ 
  title, 
  description, 
  category, 
  imageSrc, 
  index 
}: PortfolioItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "group relative opacity-0",
        index === 0 ? "animate-fade-up lg:col-span-2" : "animate-fade-up",
        index === 1 ? "[animation-delay:150ms]" : "",
        index === 2 ? "[animation-delay:300ms]" : "",
        index === 3 ? "[animation-delay:450ms]" : "",
        index === 4 ? "[animation-delay:600ms]" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className={cn(
            "absolute inset-0 bg-foreground/70 flex items-center justify-center opacity-0 transition-opacity duration-300",
            isHovered ? "opacity-100" : ""
          )}
        >
          <div className="p-6 text-center text-white">
            <p className="text-sm uppercase tracking-wider mb-2">{category}</p>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="mb-4 max-w-xs mx-auto">{description}</p>
            <span className="inline-flex items-center text-sm font-medium">
              View Project <ArrowRight size={16} className="ml-1" />
            </span>
          </div>
        </div>
        <img 
          src={imageSrc} 
          alt={title}
          className={cn(
            "w-full h-[300px] lg:h-[400px] object-cover transition-transform duration-700",
            index === 0 ? "lg:h-[500px]" : "",
            isHovered ? "scale-105" : ""
          )}
        />
      </div>
    </div>
  );
};

export default PortfolioItem;
