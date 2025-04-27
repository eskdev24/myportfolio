
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { Project } from '@/types/project';
import { saveProject } from '@/services/projectService';

interface ProjectFormProps {
  project?: Project | null;
  onSave: () => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSave, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    category: '',
    image_url: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = Boolean(project?.id);
  
  useEffect(() => {
    if (project) {
      setFormData({
        id: project.id,
        title: project.title,
        description: project.description || '',
        category: project.category || '',
        image_url: project.image_url || '',
      });
    } else {
      setFormData({
        id: '',
        title: '',
        description: '',
        category: '',
        image_url: '',
      });
    }
  }, [project]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSaving(true);
      await saveProject(formData, isEditing);
      toast.success(isEditing ? 'Project updated successfully' : 'Project created successfully');
      onSave();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(isEditing ? 'Failed to update project' : 'Failed to create project');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title*</label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Project Title"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description*</label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project Description"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">Category*</label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="UX Design, UI Design, etc."
              required
            />
          </div>
          
          <div>
            <label htmlFor="image_url" className="block text-sm font-medium mb-1">Image URL</label>
            <Input
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            type="button" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          
          <Button 
            type="submit" 
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>{isEditing ? 'Update Project' : 'Create Project'}</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
