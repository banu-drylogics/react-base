export type ColState = {
  created_at: string;
  created_by: string;
  curated: string | boolean;
  description: string;
  display_name: string;
  featured: boolean;
  name: string;
  released: string;
  score: number;
  short_description: string;
  updated_at: string;
  [key: string]: string | number | boolean;
};

export type DataFormat = {
  total_count: number;
  incomplete_results: boolean;
  items: ColState[];
};
