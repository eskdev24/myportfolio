
import { useEffect, useState } from 'react';
import { useInView } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { User, Mail, MessageSquare, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

const Contact = () => {
  const [contactRef, isInView] = useInView();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message
        }]);
        
      if (error) {
        throw error;
      }
      
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting message:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section 
      id="contact" 
      ref={contactRef as React.RefObject<HTMLElement>} 
      className="py-20 bg-gradient-to-b from-white to-secondary/30"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className={cn(
            "inline-block rounded-full px-3 py-1 text-sm font-medium bg-primary/5 text-primary mb-4 opacity-0",
            isVisible && "animate-fade-up opacity-100"
          )}>
            Get in Touch
          </span>
          
          <h2 className={cn(
            "text-3xl md:text-4xl font-display font-bold mb-6 opacity-0 [animation-delay:150ms]",
            isVisible && "animate-fade-up opacity-100"
          )}>
            Let's start a conversation
          </h2>
          
          <p className={cn(
            "text-lg text-muted-foreground opacity-0 [animation-delay:300ms]",
            isVisible && "animate-fade-up opacity-100"
          )}>
            Have a project in mind or just want to chat? Feel free to reach out.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={handleSubmit}
            className={cn(
              "p-8 rounded-2xl bg-white shadow-sm border border-border opacity-0 [animation-delay:450ms]",
              isVisible && "animate-scale-in opacity-100"
            )}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-input bg-transparent py-2 pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Your Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-input bg-transparent py-2 pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <label htmlFor="message" className="text-sm font-medium">
                Your Message
              </label>
              <div className="relative">
                <div className="absolute left-0 top-3 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full rounded-lg border border-input bg-transparent py-2 pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full inline-flex items-center justify-center h-12 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99]",
                isSubmitting && "opacity-70 pointer-events-none"
              )}
            >
              {isSubmitting ? (
                <>Sending <div className="ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div></>
              ) : (
                <>Send Message <Send size={18} className="ml-2" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
