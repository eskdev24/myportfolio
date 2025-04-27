
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ProjectForm from '@/components/admin/ProjectForm';
import ProjectList from '@/components/admin/ProjectList';
import { Project } from '@/types/project';
import { fetchProjects, deleteProject } from '@/services/projectService';

const Admin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  useEffect(() => {
    loadProjects();
  }, []);
  
  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = (project: Project) => {
    setSelectedProject(project);
  };
  
  const handleResetForm = () => {
    setSelectedProject(null);
  };
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await deleteProject(id);
      toast.success('Project deleted successfully');
      loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };
  
  const handleSave = () => {
    handleResetForm();
    loadProjects();
  };
  
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Portfolio Admin</h1>
        
        {/* Project Form */}
        <ProjectForm 
          project={selectedProject}
          onSave={handleSave}
          onCancel={handleResetForm}
        />
        
        {/* Projects List */}
        <ProjectList 
          projects={projects}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        
        <div className="mt-6 text-center">
          <a href="/" className="text-primary hover:underline">
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default Admin;
