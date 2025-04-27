
export interface Project {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  created_at: string;
  project_url?: string | null;
  tags?: string[] | null;
  updated_at?: string;
}

export interface ProjectFormData {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
}
