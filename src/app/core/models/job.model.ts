export interface MuseJob {
  id: number;
  name: string;
  contents: string;
  type: string;
  publication_date: string;
  short_name: string;
  model_type: string;
  locations: { name: string }[];
  categories: { name: string }[];
  levels: { name: string }[];
  tags: { name: string }[];
  refs: { landing_page: string };
  company: { id: number; short_name: string; name: string };
}

export interface MuseResponse {
  page: number;
  page_count: number;
  items_per_page: number;
  took: number;
  timed_out: boolean;
  total: number;
  results: MuseJob[];
}

// Internal standardized model for our app
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  created: string;
  redirect_url: string;
}
