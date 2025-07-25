export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  github?: string;
  technologies: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  technologies: string[];
  current: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
