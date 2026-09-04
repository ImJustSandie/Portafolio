export interface ProjectMedia {
  type: 'video' | 'image';
  url: string;
  filename: string;
}

export interface ProjectData {
  id: string;
  title: string;
  featured: boolean;
  category: 'dev' | 'art' | 'juegos';
  context: { es: string; en: string };
  description: { es: string; en: string };
  tags: string[];
  media: ProjectMedia[];
  orientation: 'left' | 'right';
  primaryButton?: { text: { es: string; en: string }; href: string };
  secondaryButton?: { text: { es: string; en: string }; href: string };
  role?: { es: string; en: string };
}
