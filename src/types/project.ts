export interface Project {
  title: string;
  description: string;
  image?: string;
  imageCaption?: string;
  imageFit?: 'cover' | 'contain';
  fallbackIcon: string;
  fallbackGradient: string;
  technologies: string[];
  highlights?: string[];
  systemFlow?: string[];
  liveUrl?: string;
  liveNote?: string;
  category?: 'Developer tools' | 'AI & ML' | 'Web & data' | 'Mobile';
  githubUrl?: string;
  featured: boolean;
  featuredOrder?: number;
  beginner?: boolean;
  demoType?: 'iframe' | 'video' | 'image';
  demoUrl?: string;
}

export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}
