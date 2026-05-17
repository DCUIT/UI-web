export type Component = {
  id: number;
  name: string;
  category: string;
  description: string;
  source: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | string;
  tags?: string[];
};


