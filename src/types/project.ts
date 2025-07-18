export interface Project {
  title: string;
  description: string;
  image?: string;
  fallbackIcon: string;
  fallbackGradient: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  demoType?: 'iframe' | 'video' | 'image';
  demoUrl?: string;
}

export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
} 