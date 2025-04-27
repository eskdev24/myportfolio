
import { supabase } from '@/integrations/supabase/client';
import { Project, ProjectFormData } from '@/types/project';
import { Database } from '@/integrations/supabase/types';

export const fetchProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data as Project[];
};

export const saveProject = async (formData: ProjectFormData, isEditing: boolean): Promise<void> => {
  if (isEditing) {
    // Update existing project
    const { error } = await supabase
      .from('projects')
      .update({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image_url: formData.image_url,
      })
      .eq('id', formData.id);
      
    if (error) throw error;
  } else {
    // Create new project
    const { error } = await supabase
      .from('projects')
      .insert([{
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image_url: formData.image_url,
      }]);
      
    if (error) throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};
